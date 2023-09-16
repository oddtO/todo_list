export function setUpTodoApp() {
  let addButton = document.querySelector("button.add-card");
  let docBody = document.body;
  addButton.addEventListener("click", () => {
		docBody.classList.add("popup-shown");
	});
}
