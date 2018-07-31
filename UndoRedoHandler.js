class UndoRedoHandler {
  constructor(currentstate) {
    this._undoStack = [];
    this._redoStack = [];
    this._redoStack.push(currentstate);
  }
 
  insert(state) {
    this._undoStack.push(this._redoStack.pop());
    this._redoStack.length = 0;
    this._redoStack.push(state);
  }
  
  getPrevState() {
    if (this._undoStack.length >= 1) {
      let state = this._undoStack.pop();
      this._redoStack.push(state);
      return state;
    }
  }
  
  getNextState() {
    if (this._redoStack.length >= 2) {
      let state = this._redoStack.pop();
      this._undoStack.push(state);
      return this._redoStack[this._redoStack.length - 1];
    }
  }
  
  clear() {
    if (this._redoStack.length >= 1) {
      let state = this._redoStack.pop();
      this._undoStack.length = 0;
      this._redoStack.length = 0; 
      this._redoStack.push(state);
    }
  }
}
