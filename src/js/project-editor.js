import * as Project from "./project.js";

export function initEventListeners(projectEditor) {
  let addBtn = projectEditor.querySelector('input[type="submit"]');
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let addProjectNameField = event.target.form["add-project-name"];
    let projectName = addProjectNameField.value;
    addProjectNameField.value = "";
    projectEditor.dispatchEvent(
      new CustomEvent("add-project", { detail: { projectName } }),
    );
  });

  let projectElemList = projectEditor.querySelector("aside > ul");
  projectElemList.addEventListener("click", (event) => {
    let target = event.target;
    if (target instanceof HTMLButtonElement) return;
    let projectElem = target.closest("li");
    if (!projectElem || projectElem.dataset.selected == "true") return;
    projectEditor.dispatchEvent(
      new CustomEvent("change-project", {
        detail: { projectIndex: projectElem.dataset.index },
      }),
    );
  });
}
