"use strict";
console.log("app.js file was loaded");
const arrTodo = [];

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target;
  const messageValue = target.todo.value;
  target.todo.value = "";
  todoInteraction(messageValue);
});

function todoInteraction(message) {
  const todo = new Todo(message);
  arrTodo.push(todo);
  console.log("arrTodo ===", arrTodo);
  Ui.addToPageToPage(todo);
}
