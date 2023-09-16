import * as Card from './card.js';



export function initEditorListeners(editorElem) {
  let cancelBtn = editorElem.querySelector("button.hide");

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.className = "";
    editorElem.classList.remove("new");
  });
}
