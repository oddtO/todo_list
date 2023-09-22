import { getSelectedProject, saveData } from "./project.js";

export function getCurProjectCard(index) {
  return getSelectedProject().cardList[index];
  // return cardList[index];
}

export function updateCard(index, field, value) {
  getCurProjectCard(index)[field] = value;
	saveData();
}

export function getCurProjectCardListSize() {
  return getSelectedProject().cardList.length;
}

export function deleteCard(index) {
  getSelectedProject().cardList.splice(index, 1);
  saveData();
}

export function addNewCard(title, dueDate, priority, description) {
  getSelectedProject().cardList.push(
    createCardFromInput(title, dueDate, priority, description),
  );
  saveData();
}

function createCardFromInput(title, dueDate, priority, description) {
  return {
    id: crypto.randomUUID(),
    title,
    ["due-date"]: new Date(dueDate),
    priority,
    ["is-completed"]: false,
    description,
  };
}
