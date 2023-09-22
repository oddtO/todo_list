let projectList = [];
let currentProjectIndex = 0;

export function getCurrentProjectIndex() {
  return currentProjectIndex;
}

export function getProjectListLength() {
  return projectList.length;
}

export function getProjectAt(index) {
	return projectList[index];
}

export function addProject(name) {
  projectList.push({ name, cardList: [] });
  currentProjectIndex = projectList.length - 1;
}
