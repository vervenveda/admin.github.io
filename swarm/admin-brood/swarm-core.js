/* Araneae Admin Brood — local defensive swarm core v1.0
   No network access. No repository mutation. No credential changes.
   Input: administrator-authorized evidence objects.
   Output: explainable findings for human review.
*/
(function attachAdminBrood(global){
  'use strict';

  const VERSION='1.0.0';
  const WEBLINGS=Object.freeze({
    sentry:{name:'Sentry',categories:new Set(['session','access'])},
    ledger:{name:'Ledger',categories:new Set(['assessment','record','handoff'])},
    weaver:{name:'Weaver',categories:new Set(['configuration','repository','routing'])},
    hashling:{name:'Hashling',categories:new Set(['integrity','manifest'])},
    vaultling:{name:'Vaultling',categories:new Set(['secret-boundary','key-custody'])},
    quill:{name:'Quill',categories:new Set(['audit','worklog'])},
    beacon:{name:'Beacon',categories:new Set(['backup','recovery','continuity'])}
  });

  const SECRET_PATTERNS=Object.freeze([
    {id:'pem-private-key',re:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i},
    {id:'github-token',re:/\bgh[pousr]_[A-Za-z0-9_]{20,}\b/},
    {id:'generic-api-key',re:/\b(?:api[_-]?key|secret[_-]?key|access[_-]?token)\b\s*[:=]\s*["']?[A-Za-z0-9_\-\/+=]{16,}/i},
    {id:'aws-access-key',re:/\bAKIA[0-9A-Z]{16}\b/}
  ]);

  const SEVERITY_ORDER=Object.freeze({info:0,watch:1,investigate:2,critical:3});

  function safeString(value,max=4000){
    let s='';
    try{s=typeof value==='string'?value:JSON.stringify(value)}catch{s=String(value??'')}
    return s.slice(0,max);
  }

  function stable(value){
    if(value===null||typeof value!=='object')return JSON.stringify(value);
    if(Array.isArray(value))return '['+value.map(stable).join(',')+']';
    return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+stable(value[k])).join(',')+'}';
  }

  function same(a,b){
    try{return stable(a)===stable(b)}catch{return false}
  }

  function roleFor(category){
    for(const [id,w] of Object.entries(WEBLINGS))if(w.categories.has(category))return {id,name:w.name};
    return {id:'weaver',name:'Weaver'};
  }

  function finding(event,webling,severity,code,message,evidence=[]){
    return Object.freeze({
      eventId:String(event.eventId||''),
      observedAt:String(event.observedAt||new Date().toISOString()),
      source:String(event.source||'unknown'),
      webling:webling.id,
      weblingName:webling.name,
      severity,
      code,
      message,
      evidence:evidence.slice(0,20),
      authority:'human-review-required'
    });
  }

  function detectSecretBoundary(event,webling,out){
    const text=[event.summary,event.observed,event.evidence,event.metadata].map(v=>safeString(v,12000)).join('\n');
    for(const pattern of SECRET_PATTERNS){
      if(pattern.re.test(text)){
        out.push(finding(event,{id:'vaultling',name:'Vaultling'},'critical','SENSITIVE_MATERIAL_PATTERN',
          'Evidence appears to contain material matching a sensitive credential/key pattern. Do not transmit or commit the evidence; review custody immediately.',
          [{pattern:pattern.id}]));
      }
    }
  }

  function analyzeOne(event){
    const out=[];
    if(!event||typeof event!=='object')return [Object.freeze({severity:'investigate',code:'INVALID_EVENT',message:'Input is not an event object.',webling:'weaver',weblingName:'Weaver',authority:'human-review-required'})];
    const category=String(event.category||'other');
    const webling=roleFor(category);

    if(String(event.schemaVersion||'')!=='1.0'){
      out.push(finding(event,webling,'investigate','SCHEMA_VERSION','Unexpected or missing event schema version.'));
    }
    if(!event.eventId||!event.source||!event.summary||!Array.isArray(event.evidence)||event.evidence.length===0){
      out.push(finding(event,webling,'investigate','INCOMPLETE_EVENT','Required observation fields are missing.'));
    }

    if(Object.prototype.hasOwnProperty.call(event,'expected')&&Object.prototype.hasOwnProperty.call(event,'observed')&&!same(event.expected,event.observed)){
      out.push(finding(event,webling,'watch','EXPECTED_STATE_DRIFT','Observed state differs from the administrator-provided expected state.'));
    }

    const meta=event.metadata&&typeof event.metadata==='object'?event.metadata:{};
    if(Number(meta.failedAttempts)>=5){
      out.push(finding(event,{id:'sentry',name:'Sentry'},'investigate','REPEATED_ACCESS_FAILURES','Repeated administrator access failures require review.',[{failedAttempts:Number(meta.failedAttempts)}]));
    }
    if(meta.sessionExpected===false&&meta.sessionActive===true){
      out.push(finding(event,{id:'sentry',name:'Sentry'},'critical','UNEXPECTED_ACTIVE_SESSION','An administrative session is active where the supplied expected state says none should be active.'));
    }

    if(meta.integrityExpected&&meta.integrityObserved&&String(meta.integrityExpected).toLowerCase()!==String(meta.integrityObserved).toLowerCase()){
      out.push(finding(event,{id:'hashling',name:'Hashling'},'critical','INTEGRITY_MISMATCH','Supplied expected and observed integrity values do not match.'));
    }
    if(meta.componentVersionExpected&&meta.componentVersionObserved&&String(meta.componentVersionExpected)!==String(meta.componentVersionObserved)){
      out.push(finding(event,{id:'hashling',name:'Hashling'},'investigate','COMPONENT_VERSION_DRIFT','Component version differs from the supplied expected version.'));
    }

    if(['assessment','record','handoff'].includes(category)){
      if(meta.signed===true&&meta.signatureVerified!==true){
        out.push(finding(event,{id:'ledger',name:'Ledger'},'critical','UNVERIFIED_SIGNATURE','Evidence is marked signed but the supplied verification state is not true.'));
      }
      if(meta.reviewRequired===true&&meta.reviewStatus!=='approved'){
        out.push(finding(event,{id:'ledger',name:'Ledger'},'investigate','REVIEW_NOT_APPROVED','Administrative review is required and has not been recorded as approved.'));
      }
    }

    if(['backup','recovery','continuity'].includes(category)){
      if(meta.knownGoodAvailable===false){
        out.push(finding(event,{id:'beacon',name:'Beacon'},'investigate','KNOWN_GOOD_UNAVAILABLE','No known-good recovery reference is reported available.'));
      }
      if(Number.isFinite(Number(meta.backupAgeHours))&&Number(meta.backupAgeHours)>168){
        out.push(finding(event,{id:'beacon',name:'Beacon'},'watch','STALE_BACKUP','Latest supplied backup evidence is older than seven days.',[{backupAgeHours:Number(meta.backupAgeHours)}]));
      }
    }

    if(['audit','worklog'].includes(category)&&meta.sequenceGap===true){
      out.push(finding(event,{id:'quill',name:'Quill'},'investigate','AUDIT_SEQUENCE_GAP','A gap is reported in administrative audit/worklog continuity.'));
    }

    detectSecretBoundary(event,webling,out);

    if(out.length===0){
      out.push(finding(event,webling,'info','NO_ANOMALY_FROM_SUPPLIED_EVIDENCE','No anomaly was identified from the supplied evidence. This is not proof that the system is compromise-free.'));
    }
    return out;
  }

  function correlate(findings){
    const grouped=new Map();
    for(const f of findings){
      if(f.severity==='info')continue;
      const key=f.source+'|'+f.code;
      const list=grouped.get(key)||[];list.push(f);grouped.set(key,list);
    }
    const correlations=[];
    for(const [key,list] of grouped){
      if(list.length<2)continue;
      const highest=list.reduce((a,b)=>SEVERITY_ORDER[b.severity]>SEVERITY_ORDER[a.severity]?b:a,list[0]);
      correlations.push(Object.freeze({
        type:'correlation',
        source:highest.source,
        severity:highest.severity==='watch'?'investigate':highest.severity,
        code:'REPEATED_'+highest.code,
        count:list.length,
        message:`${list.length} related findings were observed for the same source and condition.`,
        authority:'human-review-required'
      }));
    }
    return correlations;
  }

  function analyze(events){
    const list=Array.isArray(events)?events:[events];
    const findings=list.flatMap(analyzeOne);
    const correlations=correlate(findings);
    return Object.freeze({
      engine:'araneae-admin-brood',
      version:VERSION,
      analyzedAt:new Date().toISOString(),
      eventCount:list.length,
      findings,
      correlations,
      highestSeverity:[...findings,...correlations].reduce((max,f)=>SEVERITY_ORDER[f.severity]>SEVERITY_ORDER[max]?f.severity:max,'info'),
      authority:'human-review-required',
      disclaimer:'Defensive evidence analysis only. No autonomous remediation or compromise determination.'
    });
  }

  global.AraneaeAdminBrood=Object.freeze({version:VERSION,weblings:WEBLINGS,analyze});
})(window);
