const els = {
  form: document.getElementById("form"),
  output: document.getElementById("tbody"),
};
class Ui {
  static addToPageToPage(todo) {
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
          <td class="col-span-1 text-neutral-50 text-2xl justify-self-center">${todoId}</td>
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
    this.createDeleteEvent(tr);
    this.createEditEvent(tr);
    this.createReadEvent(todo, tr);
    els.output.insertBefore(tr, els.form);
  }
  static checkStatus(todo, tableRow) {
    const status = tableRow.querySelector(".status");
    if (todo.status === true) {
      status.classList.add("bg-primary");
      status.classList.remove("bg-black");
      console.log("primary ===");
    } else {
      status.classList.remove("bg-primary");
      status.classList.add("bg-black");
    }
  }

  static createDeleteEvent(tableRow) {
    const delBtn = tableRow.querySelector(".delete");
    delBtn.addEventListener("click", () => {
      tableRow.remove();
    });
  }

  static createEditEvent(tableRow) {
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
      }
    });
  }

  static createReadEvent(todo, tableRow) {
    const statusBtn = tableRow.querySelector(".status");
    const status = tableRow.querySelector(".status");

    console.log("statusBtn ===", statusBtn);
    statusBtn.addEventListener("click", () => {
      if (todo.status === true) {
        todo.status = false;
        statusBtn.textContent = "Todo";
        status.classList.add("bg-primary");
        status.classList.remove("bg-black");
      } else {
        todo.status = true;
        status.classList.remove("bg-primary");
        status.classList.add("bg-black");
        statusBtn.textContent = "Done";
      }
    });
  }
}
