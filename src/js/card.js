export let cardList = [];

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
