class Todo {
  static lastId = 0;
  #id;
  #message;
  #status;
  constructor(message) {
    this.#message = message;
    Todo.lastId += 1;
    this.#id = Todo.lastId;
    this.#status = false;
  }
  get message() {
    return this.#message;
  }
  set message(value) {
    return (this.#message = value);
  }
  get id() {
    return this.#id;
  }
  get status() {
    return this.#status;
  }
  set status(value) {
    this.#status = value;
  }
}
