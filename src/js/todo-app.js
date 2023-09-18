import * as Editor from "./editor";
import * as Card from "./card.js";
import { render } from "./render.js";
export function setUpTodoApp() {
  let form = document.querySelector("form.editor");

  Editor.initEditorListeners(form);

  let addButton = document.querySelector("button.add-card");

  let docBody = document.body;
  addButton.addEventListener("click", () => {
    docBody.classList.add("popup-shown");
    form.classList.add("new");
  });

  form.addEventListener("new-card", () => {
    render();
  });

  let todoList = document.querySelector("ul.todo-list");

  todoList.addEventListener("click", (event) => {
    let target = event.target;
    if (target instanceof HTMLButtonElement) return;
    let cardElem = target.closest(".todo-preview-card");
    if (!cardElem) return;
	
    docBody.classList.add("popup-shown");
	Editor.displayCardInEditor(form, cardElem);
	
  });

}
