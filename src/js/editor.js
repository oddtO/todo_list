import * as Card from "./card.js";
import { askReRender, getValueFieldName, FieldEditor } from "./field-editor.js";

let editedCardLiElem = Symbol("edited-card");

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

  let isCompletedCheckbox = editorElem.querySelector('[name="is-completed"]');
  isCompletedCheckbox.addEventListener("change", (event) => {
    Card.cardList[editorElem.dataset.editingIndex][isCompletedCheckbox.name] =
      isCompletedCheckbox.checked;
    askReRender(editorElem, editedCardLiElem);
  });

  let editButtonsAll = editorElem.querySelectorAll("label ul");
  for (const editButtons of editButtonsAll) {
    editButtons.addEventListener(
      "click",
      new FieldEditor(editorElem, editedCardLiElem),
    );
  }

  let confirmBtn = editorElem.querySelector("input.confirm");
  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideEditor();
  });

  function hideEditor() {
    document.body.className = "";
    editorElem.classList.remove("new");
  }
}

export function displayCardInEditor(editorElem, cardLiElem) {
  let inputs = editorElem.querySelectorAll("[name]");
  let card = Card.cardList[cardLiElem.firstElementChild.dataset.index];
  editorElem.dataset.editingIndex = cardLiElem.firstElementChild.dataset.index;
  editorElem[editedCardLiElem] = cardLiElem;
  for (const input of inputs) {
    let value = card[input.name];
    input[getValueFieldName(input)] = value;
    if (input.type == "checkbox") continue;
    input.disabled = true;
  }
}
