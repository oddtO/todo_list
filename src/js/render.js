import * as Card from './card.js';


let todoList = document.querySelector("ul.todo-list");
export function render() {
  todoList.innerHTML = "";

  for (let i = 0; i < Card.cardList.length; ++i) {
    appendCardRendered(Card.cardList[i], i);
  }
}

function appendCardRendered(card, index) {
  let li = document.createElement("li");
  li.innerHTML = `
              <div
		                class="todo-preview-card"
                data-priority="${card.priority}"
  		    data-status="${
            card.isCompleted
              ? "completed"
              : new Date() > card.dueDate
              ? "failed"
              : ""
          }"
  		data-index="${index}"
              >
                <h2 class="title">
					    ${card.title}
                </h2>

                <div class="description-short">
					    ${card.description}
                </div>

                <time class="due-date">${card.dueDate.toLocaleString("en-US")};
	                </time>

                <div class="action-buttons-wrapper" title="mark as complete">
		                <button><img /></button>
				              </div>
              </div>
		`;

  todoList.append(li);
}
