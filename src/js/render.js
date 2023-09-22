import * as Card from "./card.js";
import * as Project from "./project.js";

let todoList = document.querySelector("ul.todo-list");
let projectList = document.querySelector("aside > ul");
export function render() {
	clearList();
  for (let i = 0; i < Card.getCurProjectCardListSize(); ++i) {
    appendCardRendered(Card.getCurProjectCard(i), i);
  }
}

export function clearList() {

  todoList.innerHTML = "";
}

export function reRenderCardElem(cardLiElem) {
  let index = cardLiElem.firstElementChild.dataset.index;
  let card = Card.getCurProjectCard(index);
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

export function renderProjectList() {
  projectList.innerHTML = "";

  for (let i = 0; i < Project.getProjectListLength(); ++i) {
    projectList.insertAdjacentHTML(
      "beforeend",
      renderAproject(
        Project.getProjectAt(i),
        i,
        Project.isProjectSelectedAt(i),
      ),
    );
  }
}

function renderAproject(project, indexRef, isSelected) {
  return `
          <li data-index='${indexRef}' data-selected="${
            isSelected ? "true" : "false"
          }">
            <div class="project">
              <h2 class="heading">
			${project.name}
              </h2>
            </div>
            <button class="delete-button"><img /></button>
          </li>
	`;
}
