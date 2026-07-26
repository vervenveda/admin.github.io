<!-- Part 1: Font & Color Picker UI -->
<div id="fontColorToolbar" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
<div id="fontPicker"></div>
<input type="color" id="foreColorPicker" title="Text Color">
<input type="color" id="hiliteColorPicker" title="Highlight Color">
<input type="color" id="textShadowColorPicker" title="Text Shadow Color">
<input type="number" id="textShadowOffsetX" title="Shadow Offset X" placeholder="X" style="width:50px">
<input type="number" id="textShadowOffsetY" title="Shadow Offset Y" placeholder="Y" style="width:50px">
<input type="number" id="textShadowBlur" title="Shadow Blur" placeholder="Blur" style="width:50px">
<button id="applyTextShadowBtn">Apply Shadow</button>
</div>


<script>
/* ---- Font & Color Picker Logic ---- */
const fonts = ['Arial','Verdana','Tahoma','Times New Roman','Courier New','Georgia','Palatino','Garamond','Bookman','Comic Sans MS','Impact','Lucida Console','Brush Script MT','Trebuchet MS','Lucida Sans Unicode','Calibri','Roboto','Open Sans','Lobster'];


// dynamically create font picker
function renderFontPicker(){
const picker = document.getElementById('fontPicker');
picker.innerHTML = '';
fonts.forEach(f => {
const btn = document.createElement('button');
btn.textContent = f;
btn.style.fontFamily = f;
btn.style.margin = '2px';
btn.onclick = () => applyFont(f);
picker.appendChild(btn);
});
}


function applyFont(font){
wrapSelectionWithSpan({ fontFamily: font });
}


function applyForeColor(color){
wrapSelectionWithSpan({ color: color });
}


function applyHiliteColor(color){
wrapSelectionWithSpan({ backgroundColor: color });
}


function applyTextShadow(color='black', offsetX='1px', offsetY='1px', blur='2px'){
wrapSelectionWithSpan({ textShadow: `${offsetX}px ${offsetY}px ${blur}px ${color}` });
}


// Event bindings
renderFontPicker();
document.getElementById('foreColorPicker').addEventListener('input', e=>applyForeColor(e.target.value));
document.getElementById('hiliteColorPicker').addEventListener('input', e=>applyHiliteColor(e.target.value));
document.getElementById('applyTextShadowBtn').addEventListener('click', ()=>{
const color = document.getElementById('textShadowColorPicker').value;
const x = document.getElementById('textShadowOffsetX').value || 1;
const y = document.getElementById('textShadowOffsetY').value || 1;
const blur = document.getElementById('textShadowBlur').value || 2;
applyTextShadow(color, x, y, blur);
});
</script>
