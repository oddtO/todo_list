let projectList = [];
let currentProjectIndex = 0;

export function isProjectSelectedAt(index) {
  return index == currentProjectIndex;
}

export function setSelectedProjectIndex(index) {
  currentProjectIndex = index;
}

export function deleteProjectAt(index) {
  projectList.splice(index, 1);
  if (isProjectSelectedAt(index)) {
    currentProjectIndex = null;
  }
	else if(currentProjectIndex > index) {
		currentProjectIndex -= 1;
	}
}

export function getProjectListLength() {
  return projectList.length;
}

export function getProjectAt(index) {
  return projectList[index];
}

export function getSelectedProject() {
  return projectList[currentProjectIndex];
}

export function addProject(name) {
  projectList.push({ name, cardList: [] });
  currentProjectIndex = projectList.length - 1;
}
