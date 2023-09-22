import * as Project from "./project.js";

let cardList = [];

export function getCurProjectCardList(index) {
  return cardList[index];
}

export function getCurProjectCardListSize() {
  return cardList.length;
}

export function deleteCard(index) {
	cardList.splice(index, 1);

}


export function addNewCard(title, dueDate, priority, description) {
  cardList.push(createCardFromInput(title, dueDate, priority, description));
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
