"use strict";
console.log("app.js file was loaded");

const els = {
  form: document.getElementById("form"),
  output: document.getElementById("tbody"),
};
let arrTodo = [];

if (localStorage.key("todoList")) {
  let stringTodo = localStorage.getItem("todoList");
  arrTodo = JSON.parse(stringTodo);
  if (Array.isArray(arrTodo)) {
    arrTodo = arrTodo;
  } else {
    arrTodo = [arrTodo];
  }
  arrTodo.forEach((todo) => Ui.addToPageToPage(todo));
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
  Ui.addToPageToPage(todo);
}
