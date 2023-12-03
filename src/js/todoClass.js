class Todo {
  #message;
  constructor(message) {
    this.#message = message;
  }
  get message() {
    return this.#message;
  }
  set message(value) {
    return (this.#message = value);
  }
}
