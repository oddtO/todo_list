import * as Editor from "./editor";
import * as ProjectEditor from "./project-editor.js";
import * as Card from "./card.js";
import * as Project from "./project.js";

import { render, reRenderCardElem, renderProjectList } from "./render.js";
import { projectList } from "./project";
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

  form.addEventListener("card-change", (event) => {
    reRenderCardElem(event.detail.cardLiElem);
  });

  form.addEventListener("card-delete", (event) => {
    let elemToDelete = event.detail.cardElemToBeDeleted;
    let cardIndexToDelete = elemToDelete.dataset.index;
    Card.cardList.splice(cardIndexToDelete, 1);
    render();
  });

  let todoList = document.querySelector("ul.todo-list");

  todoList.addEventListener("click", (event) => {
    let target = event.target;
    let cardLiElem = target.closest(".todo-preview-card")?.parentElement;
    if (!cardLiElem) return;

    if (target instanceof HTMLButtonElement) {
      Card.cardList[cardLiElem.firstElementChild.dataset.index][
        "is-completed"
      ] = true;
      reRenderCardElem(cardLiElem);
      return;
    }

    docBody.classList.add("popup-shown");
    Editor.displayCardInEditor(form, cardLiElem);
  });

let projectAside = document.querySelector('aside');
  ProjectEditor.initEventListeners(projectAside);
  projectAside.addEventListener("add-project", (event) => {
    Project.addProject(event.detail.projectName);
    renderProjectList();
  });
}
