const els = {
  form: document.getElementById("form"),
  output: document.getElementById("tbody"),
};
let arrTodo = [];
class Ui {
  static addToPageToPage(todo) {
    console.log(todo);
    const messageVal = todo.message;
    const todoId = todo.id;
    const status = todo.status === true ? "Done" : "Todo";
    const tr = document.createElement("tr");
    tr.classList.add(
      "table-tr",
      "grid",
      "grid-cols-7",
      "justify-between",
      "w-full",
      "py-5",
      "px-5",
      "items-center",
      "border-b-primary",
      "border-b-2"
    );
    let html = `
    <td class="id col-span-1 text-neutral-50 text-2xl justify-self-center">${todoId}</td>
    <td class="col-span-3 text-neutral-50 text-xl justify-self-start font-light">
    <input class="bg-transparent focus:outline-none " readonly placeholder='your todo' value="${messageVal}"></td>
    <td class="col-span-1 text-neutral-50 text-xl justify-self-center w-full ">
      <button type='button'
        class="status  py-3 w-full border-white rounded-lg border hover:bg-blue-900">${status}</button>
    </td>
    <td class="col-span-1 text-neutral-50 text-xl justify-self-center ">
      <button type='button' class="edit py-3 w-14 border-white rounded-lg border hover:bg-black">
        <img class="h-7 block m-auto" src="src/img/todo-edit.svg" alt="pen picture to edit">
      </button>
    </td>
    <td class="col-span-1 text-neutral-50 text-xl justify-self-center w-full">
      <button
        class="delete bg-red-700 py-3 w-full  border-white rounded-lg border hover:bg-red-950">Delete</button>
    </td>
    `;
    tr.innerHTML = html;
    this.checkStatus(todo, tr);
    // create events
    this.createDeleteEvent(tr, todoId);
    this.createEditEvent(tr, todoId);
    this.createReadEvent(todo, tr, todoId);
    // add todo
    els.output.insertBefore(tr, els.form);

    // check local and set
    this.saveToLocalStorage();
  }
  static checkStatus(todo, tableRow) {
    const status = tableRow.querySelector(".status");
    if (todo.status === true) {
      status.classList.add("bg-primary");
      status.classList.remove("bg-black");
    } else {
      status.classList.remove("bg-primary");
      status.classList.add("bg-black");
    }
  }

  static createDeleteEvent(tableRow, idValue) {
    const delBtn = tableRow.querySelector(".delete");
    delBtn.addEventListener("click", () => {
      const stringArr = localStorage.getItem("todoList");
      let localArr = JSON.parse(stringArr);
      localArr = localArr.filter((obj) => +idValue !== obj.id);
      localArr = JSON.stringify(localArr);
      localStorage.removeItem("todoList");
      localStorage.setItem("todoList", localArr);
      arrTodo = arrTodo.filter((obj) => obj.id !== idValue);
      tableRow.remove();
    });
  }

  static createEditEvent(tableRow, idValue) {
    const editBtn = tableRow.querySelector(".edit");

    editBtn.addEventListener("click", () => {
      const input = tableRow.querySelector("input");
      const img = tableRow.querySelector("img");
      if (input.hasAttribute("readonly")) {
        img.src = "/src/img/todo-save.svg";
        input.removeAttribute("readonly");
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      } else {
        input.setAttribute("readonly", "");
        img.src = "/src/img/todo-edit.svg";
        const stringArr = localStorage.getItem("todoList");
        let localArr = JSON.parse(stringArr);
        localArr = localArr.map((obj) => {
          let newMessage;
          if (+idValue === obj.id) {
            newMessage = input.value;
          } else {
            newMessage = obj.message;
          }
          return {
            id: obj.id,
            message: newMessage,
            status: obj.status,
          };
        });
        localArr = JSON.stringify(localArr);
        localStorage.removeItem("todoList");
        localStorage.setItem("todoList", localArr);
      }
    });
  }

  static createReadEvent(todo, tableRow, idValue) {
    const statusBtn = tableRow.querySelector(".status");
    const status = tableRow.querySelector(".status");

    statusBtn.addEventListener("click", () => {
      const stringArr = localStorage.getItem("todoList");
      let localArr = JSON.parse(stringArr);
      if (todo.status === true) {
        localArr = localArr.map((obj) => {
          let newStatus;
          if (idValue === obj.id) {
            newStatus = false;
          } else {
            newStatus = obj.status;
          }
          return {
            id: obj.id,
            message: obj.message,
            status: newStatus,
          };
        });
        localArr = JSON.stringify(localArr);
        localStorage.removeItem("todoList");
        localStorage.setItem("todoList", localArr);
        todo.status = false;
        statusBtn.textContent = "Todo";
        status.classList.add("bg-black");
        status.classList.remove("bg-primary");
      } else {
        localArr = localArr.map((obj) => {
          let newStatus;
          if (idValue === obj.id) {
            newStatus = true;
          } else {
            newStatus = obj.status;
          }
          return {
            id: obj.id,
            message: obj.message,
            status: newStatus,
          };
        });
        localArr = JSON.stringify(localArr);
        localStorage.removeItem("todoList");
        localStorage.setItem("todoList", localArr);
        todo.status = true;
        status.classList.remove("bg-black");
        status.classList.add("bg-primary");
        statusBtn.textContent = "Done";
      }
    });
  }
  static saveToLocalStorage() {
    arrTodo = arrTodo.map((todo) => {
      if (todo instanceof Todo) {
        const todoObj = todo.todoToObj();
        return todoObj;
      } else {
        if (Array.isArray(arrTodo)) {
          return todo;
        } else {
        }
      }
    });
    arrTodo = JSON.stringify(arrTodo);

    localStorage.setItem("todoList", arrTodo);
    arrTodo = JSON.parse(arrTodo);
  }
  static checkId() {
    const stringTodo = localStorage.getItem("todoList");
    if (localStorage.key("todoList")) {
      // const stringTodo = localStorage.getItem("todoList");
      const arrTodoList = JSON.parse(stringTodo);
      const arrTodoLastIndex = arrTodoList.length - 1;
      if (stringTodo !== "[]") {
        const lastId = arrTodoList[arrTodoLastIndex].id;
        return lastId;
      }
      return 0;
    } else {
      return 0;
    }
  }
}
