"use strict";
console.log("app.js file was loaded");

if (localStorage.key("todoList")) {
  console.log("start");
  let stringTodo = localStorage.getItem("todoList");
  arrTodo = JSON.parse(stringTodo);
  console.log("arrTodo ===", arrTodo);

  if (Array.isArray(arrTodo)) {
    arrTodo = arrTodo;
  } else {
    arrTodo = [arrTodo];
  }
  if (stringTodo === []) {
    console.log("true");
  }
  console.log("arrTodo ===", arrTodo);
  arrTodo.forEach((todo) => Ui.addToPageToPage(todo));
  console.log("arrTodo ===", arrTodo);
}

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
