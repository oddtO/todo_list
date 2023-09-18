import * as Card from "./card.js";

let todoList = document.querySelector("ul.todo-list");
export function render() {
  todoList.innerHTML = "";

  for (let i = 0; i < Card.cardList.length; ++i) {
    appendCardRendered(Card.cardList[i], i);
  }
}

export function reRenderCardElem(cardLiElem) {
  let index = cardLiElem.firstElementChild.dataset.index;
  let card = Card.cardList[index];
  cardLiElem.firstElementChild.outerHTML = renderACard(card, index);
}

function appendCardRendered(card, index) {
  let li = document.createElement("li");
  li.innerHTML = renderACard(card, index);

  todoList.append(li);
}

function renderACard(card, index) {
  return `
              <div
		                class="todo-preview-card"
                data-priority="${card.priority}"
  		    data-status="${
            card["is-completed"]
              ? "completed"
              : new Date() > card["due-date"]
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

                <time class="due-date">${card["due-date"].toLocaleString(
                  "en-US",
                )}
	                </time>

                <div class="action-buttons-wrapper" title="mark as complete">
		                <button><img /></button>
				              </div>
              </div>
		`;
}
