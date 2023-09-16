let cardList = [];

export function addNewCard(title, dueDate, priority, isCompleted, description) {
	cardList.push(createCardFromInput(

  title,
  dueDate,
  priority,
  isCompleted,
  description,

	));
	

}

function createCardFromInput(
  title,
  dueDate,
  priority,
  isCompleted,
  description,
) {
  return {
    id: crypto.randomUUID(),
    title,
    dueDate: new Date(dueDate),
    priority,
    isCompleted,
    description,
  };
}
