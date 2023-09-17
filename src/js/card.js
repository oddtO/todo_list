export let cardList = [];

export function addNewCard(title, dueDate, priority, description) {
  cardList.push(createCardFromInput(title, dueDate, priority, description));
}

function createCardFromInput(title, dueDate, priority, description) {
  return {
    id: crypto.randomUUID(),
    title,
    dueDate: new Date(dueDate),
    priority,
		isCompleted: false,
    description,
  };
}
