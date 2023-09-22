import * as Project from "./project.js";

export function initEventListeners(projectEditor) {
  let addBtn = projectEditor.querySelector("aside > form");
  addBtn.addEventListener("submit", (event) => {
    let form = event.target;
    let addProjectNameField = form["add-project-name"];
    if (!addProjectNameField.checkValidity()) return;
    event.preventDefault();
    let projectName = addProjectNameField.value;
    addProjectNameField.value = "";
    projectEditor.dispatchEvent(
      new CustomEvent("add-project", { detail: { projectName } }),
    );
  });

  let projectElemList = projectEditor.querySelector("aside > ul");
  projectElemList.addEventListener("click", (event) => {
    let target = event.target;
    let projectElem = target.closest("li");
    if (!projectElem) return;

    let isSelected = projectElem.dataset.selected == "true";
    projectEditor.dispatchEvent(
      new CustomEvent(
        target.matches("img") ? "delete-project" : "change-project",
        {
          detail: { projectIndex: projectElem.dataset.index, isSelected },
        },
      ),
    );
  });
}
