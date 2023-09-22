import * as Card from "./card.js";

export class FieldEditor {
  constructor(editorElem, editedCardLiElem) {
    this.editorElem = editorElem;
    this.editedCardLiElem = editedCardLiElem;
  }
  handleEvent(event) {
    let action = event.target.dataset.action;
    if (!action) return;
    event.preventDefault();
    this[action](event);
  }
  editField(event) {
    let target = event.target;
    let inputLabel = target.closest("label");
    inputLabel.classList.add("on-edit");

    let input = inputLabel.querySelector("[name]");
    input.disabled = false;
    this.input = input;
    this.inputLabel = inputLabel;
  }
  cancelEditField() {
    this.input[getValueFieldName(this.input)] =
      Card.getCurProjectCard(this.editorElem.dataset.editingIndex)[this.input.name];
    this.disableField();
  }
  saveEditField() {
    Card.getCurProjectCard(this.editorElem.dataset.editingIndex)[
      this.input.name
    ] = this.input[getValueFieldName(this.input)];
    this.disableField();
    askReRender(this.editorElem, this.editedCardLiElem);
  }
  disableField() {
    this.inputLabel.classList.remove("on-edit");
    this.input.disabled = true;
  }
}

export function askReRender(editorElem, editedCardLiElem) {
  editorElem.dispatchEvent(
    new CustomEvent("card-change", {
      detail: { cardLiElem: editorElem[editedCardLiElem] },
    }),
  );
}

export function getValueFieldName(input) {
  if (input.matches('[type="date"]')) return "valueAsDate";

  if (input.matches('[type="checkbox"]')) return "checked";
  return "value";
}
