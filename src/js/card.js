let cardList = [];
let todoList = document.querySelector("#todo-list");


export function addNewCard(title, dueDate, priority, isCompleted, description) {
  cardList.push(
    createCardFromInput(title, dueDate, priority, isCompleted, description),
  );
  console.log(cardList);
}


export function render() {
	

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



