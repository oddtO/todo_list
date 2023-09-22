let projectList = JSON.parse(
  localStorage.getItem("project-list"),
  function replacer(name, value) {
    if (name == "due-date") {
      return new Date(value);
    } else {
      return value;
    }
  },
) || [
  {
    name: "default",
    cardList: [],
  },
];
let currentProjectIndex =
  JSON.parse(localStorage.getItem("current-project-index"));

function storeSelectedProjectIndex() {
  localStorage.setItem(
    "current-project-index",
    JSON.stringify(currentProjectIndex),
  );
}

export function saveData() {
  localStorage.setItem("project-list", JSON.stringify(projectList));
}

export function isProjectSelectedAt(index) {
  return index == currentProjectIndex;
}

export function isProjectSelected() {
  return currentProjectIndex !== null;
}

export function setSelectedProjectIndex(index) {
  currentProjectIndex = index;
  storeSelectedProjectIndex();
}

export function deleteProjectAt(index) {
  projectList.splice(index, 1);
  if (isProjectSelectedAt(index)) {
    setSelectedProjectIndex(null);
  } else if (currentProjectIndex > index) {
    setSelectedProjectIndex(currentProjectIndex - 1);
  }
  saveData();
}

export function getProjectListLength() {
  return projectList.length;
}

export function getProjectAt(index) {
  return projectList[index];
}
export class NoProjectSelectedError extends Error {
  constructor(message) {
    super(message);
  }
}
export function getSelectedProject() {
  if (currentProjectIndex === null)
    throw new NoProjectSelectedError("Please, create or select a project");
  return projectList[currentProjectIndex];
}

export function addProject(name) {
  projectList.push({ name, cardList: [] });
  setSelectedProjectIndex(currentProjectIndex ? projectList.length - 1 : 0);
  saveData();
}
