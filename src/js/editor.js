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

  let editButtonsAll = editorElem.querySelectorAll("label ul");
  for (const editButtons of editButtonsAll) {
    editButtons.addEventListener(
      "click",
      new (class {
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
            Card.cardList[editorElem.dataset.editingIndex][this.input.name];
          this.disableField();
        }
        saveEditField() {
			Card.cardList[editorElem.dataset.editingIndex][this.input.name] = this.input[getValueFieldName(this.input)];
					this.disableField();

				}
        disableField() {
          this.inputLabel.classList.remove("on-edit");
          this.input.disabled = true;
        }
      })(),
    );
  }
  function hideEditor() {
    document.body.className = "";
    editorElem.classList.remove("new");
  }
}

export function displayCardInEditor(editorElem, cardElem) {
  let inputs = editorElem.querySelectorAll("[name]");
  let card = Card.cardList[cardElem.dataset.index];
  editorElem.dataset.editingIndex = cardElem.dataset.index;
  for (const input of inputs) {
    let value = card[input.name];
    input[getValueFieldName(input)] = value;
    if (input.type == "checkbox") continue;
    input.disabled = true;
  }
}

function getValueFieldName(input) {
  if (input.matches('[type="date"]')) return "valueAsDate";

  if (input.matches('[type="checkbox"]')) return "checked";
  return "value";
}
