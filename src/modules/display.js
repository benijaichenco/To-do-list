import Project from "./project.js";
import Task from "./task.js";

export default class Display {
  static createForm() {
    const body = document.body;
    const container = document.createElement("div");
    container.classList.add(".container");

    const formElement = document.createElement("form");
    formElement.setAttribute("action", "#");
    formElement.setAttribute("method", "get");

    const titleInput = document.createElement("input");
    titleInput.classList.add("task-title-input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("placeholder", "title");

    body.appendChild(container);
    container.appendChild(formElement);
    formElement.appendChild(titleInput);
  }
}
