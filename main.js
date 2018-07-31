document.addEventListener("DOMContentLoaded", function() {
  const $ = document.querySelector.bind(document); 
  const _form = $("#myForm");
  const _btnUndo = $("#btn-undo");
  const _btnRedo = $("#btn-redo");
  const _btnClear = $("#btn-clear");
  const _txtPreview = $("#txt-preview");
  const _content = $("#content");
  const _color = $("#color");
  
  const textDefault = "undo-redo";
  const colorDefault = "#222222";
  const undoRedoHandler = new UndoRedoHandler({
    text: textDefault,
    color: colorDefault
  });
  
  init();
  
  _form.addEventListener("submit", function(event) {
    event.preventDefault();
    applyPreview(_content.value, _color.value);
    
    undoRedoHandler.insert({
      text: _content.value,
      color: _color.value
    });
  });
  
  _btnClear.addEventListener("click", function(event) {
    undoRedoHandler.clear();
  });
  
  _btnUndo.addEventListener("click", function(event) {
    const state = undoRedoHandler.getPrevState();
    
    if (state) {
      applyPreview(state.text, state.color);
    }
  });
  
  _btnRedo.addEventListener("click", function(event) {
    const state = undoRedoHandler.getNextState();
    
    if (state) {
      applyPreview(state.text, state.color);
    }
  });
  
  function init() {
    _content.value = textDefault;
    _color.value = colorDefault;
    applyPreview(_content.value, _color.value);
  }
  
  function applyPreview(text, color) {
    _txtPreview.textContent = text;
    _txtPreview.style.color = color;
  }
});
