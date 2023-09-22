import * as Project from "./project.js";

export function initEventListeners(projectEditor) {
  let addBtn = projectEditor.querySelector('input[type="submit"]');
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let addProjectNameField = event.target.form["add-project-name"];
    let projectName = addProjectNameField.value;
    addProjectNameField.value = "";
	projectEditor.dispatchEvent(new CustomEvent('add-project', {detail: {projectName}}))
  });
}
