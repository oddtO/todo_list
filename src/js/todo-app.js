import * as Editor from "./editor";
import * as ProjectEditor from "./project-editor.js";
import * as Card from "./card.js";
import * as Project from "./project.js";

import {
  render,
  reRenderCardElem,
  renderProjectList,
  clearList,
} from "./render.js";
import { projectList } from "./project";
export function setUpTodoApp() {
  try {
    renderProjectList();
    render();
  } catch (error) {
    if (error instanceof Project.NoProjectSelectedError)
      alert(error.message);
  }
  let form = document.querySelector("form.editor");

  Editor.initEditorListeners(form);

  let addButton = document.querySelector("button.add-card");

  let docBody = document.body;
  addButton.addEventListener("click", () => {
    if (!Project.isProjectSelected()) {
      alert("Please, select a project or create one");
      return;
    }
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
    let elemLiToDelete = event.detail.cardElemToBeDeleted;
    let cardIndexToDelete = elemLiToDelete.firstElementChild.dataset.index;
    Card.deleteCard(cardIndexToDelete);
    render();
  });

  let todoList = document.querySelector("ul.todo-list");

  todoList.addEventListener("click", (event) => {
    let target = event.target;
    let cardLiElem = target.closest(".todo-preview-card")?.parentElement;
    if (!cardLiElem) return;

    if (target instanceof HTMLButtonElement) {
      /* Card.getCurProjectCard(cardLiElem.firstElementChild.dataset.index)[
        "is-completed"
      ] = true; */
      Card.updateCard(
        cardLiElem.firstElementChild.dataset.index,
        "is-completed",
        true,
      );
      reRenderCardElem(cardLiElem);
      return;
    }

    docBody.classList.add("popup-shown");
    Editor.displayCardInEditor(form, cardLiElem);
  });

  let projectAside = document.querySelector("aside");
  ProjectEditor.initEventListeners(projectAside);
  projectAside.addEventListener("add-project", (event) => {
    Project.addProject(event.detail.projectName);
    renderProjectList();
    render();
  });

  projectAside.addEventListener("change-project", (event) => {
    Project.setSelectedProjectIndex(event.detail.projectIndex);
    renderProjectList();
    render();
  });

  projectAside.addEventListener("delete-project", (event) => {
    Project.deleteProjectAt(event.detail.projectIndex);
    renderProjectList();
    if (event.detail.isSelected) clearList();
  });
}
