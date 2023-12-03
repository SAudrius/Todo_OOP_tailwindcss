const todo1 = new Todo("create a h2");
todo1.message = "nothink";

const els = {
  form: document.getElementById("form"),
};

els.form.addEventListener("submit", (event) => {
  todoInteraction(messageValue);
});

function todoInteraction(message) {
  const todo = new Todo();
}
