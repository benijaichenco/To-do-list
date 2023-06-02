import Project from "./project.js";
import Task from "./task.js";
import logo from "../images/logo.png";
import plusSign from "../images/plus-circle.png";

export default class Display {
  static loadHomePage() {
    Display.getHeader();
  }

  static getHeader() {
    const body = document.body;

    // create header
    const header = document.createElement("header");
    header.classList.add("header");
    body.appendChild(header);

    // left header part
    const headerLeft = document.createElement("div");
    headerLeft.classList.add("header-left");
    header.appendChild(headerLeft);

    const logoImg = document.createElement("img");
    logoImg.classList.add("logo");
    logoImg.setAttribute("src", logo);
    headerLeft.appendChild(logoImg);

    const logoText = document.createElement("h1");
    logoText.classList.add("text-logo");
    logoText.textContent = "To-Do";
    headerLeft.appendChild(logoText);

    // right header part
    const headerRight = document.createElement("div");
    headerRight.classList.add("header-right");
    header.appendChild(headerRight);

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project");
    addProjectBtn.removeEventListener("click", Project.addProject);
    addProjectBtn.addEventListener("click", Project.addProject);
    headerRight.appendChild(addProjectBtn);

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    addProjectBtn.appendChild(textContainer);

    const addProjectBtnText = document.createElement("div");
    addProjectBtnText.classList.add("add-project-button-text");
    addProjectBtnText.textContent = "Add Project";
    textContainer.appendChild(addProjectBtnText);

    const plusSignSpan = document.createElement("span");
    plusSignSpan.classList.add("plus-sign");
    addProjectBtn.appendChild(plusSignSpan);

    const plusSignImg = document.createElement("img");
    plusSignImg.classList.add("add-project-img");
    plusSignImg.setAttribute("src", plusSign);
    plusSignSpan.appendChild(plusSignImg);
  }
}
