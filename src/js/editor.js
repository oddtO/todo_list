import * as Card from "./card.js";

export function initEditorListeners(editorElem) {
  let cancelBtn = editorElem.querySelector("button.hide");
  let addBtn = editorElem.querySelector("input.add-card");

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideEditor();
  });

  addBtn.addEventListener("click", (event) => {
    if (!editorElem.checkValidity()) {
      return;
    }
    event.preventDefault();

    Card.addNewCard(
      editorElem.title.value,
      editorElem["due-date"].value,
      editorElem.priority.value,
      editorElem.description.value,
    );
    let addCardEvent = new CustomEvent("new-card");
    editorElem.dispatchEvent(addCardEvent);
    hideEditor();
  });

  function hideEditor() {
    document.body.className = "";
    editorElem.classList.remove("new");
  }
}
