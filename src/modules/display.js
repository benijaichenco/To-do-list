import Project from "./project.js";
import Task from "./task.js";
import logo from "../images/logo.png";
import plusSign from "../images/plus-circle.png";
import inboxImg from "../images/inbox.png";

export default class Display {
  static loadHomePage() {
    Display.createHeader();
    Display.createContainer();
  }

  // create header function
  static createHeader() {
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

  // create container function
  static createContainer() {
    const body = document.body;

    const container = document.createElement("div");
    container.classList.add("container");
    body.appendChild(container);
    Display.createSidebar();
    Display.createMain();
  }

  // create sidebar function
  static createSidebar() {
    const container = document.querySelector(".container");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    container.appendChild(sidebar);

    const defaultProjects = document.createElement("div");
    defaultProjects.classList.add("default-projects");
    sidebar.appendChild(defaultProjects);

    const inbox = document.createElement("button");
    inbox.classList.add("sidebar-inbox-button");
    inbox.removeEventListener("click", Display.showInbox);
    inbox.addEventListener("click", Display.showInbox);
    defaultProjects.appendChild(inbox);

    const inboxIcon = document.createElement("div");
    inboxIcon.classList.add("sidebar-inbox-icon");
    inbox.appendChild(inboxIcon);

    const inboxIconImg = document.createElement("img");
    inboxIconImg.setAttribute("src", inboxImg);
    inboxIcon.appendChild(inboxIconImg);

    const inboxTitle = document.createElement("div");
    inboxTitle.classList.add("sidebar-inbox-title");
    inboxTitle.textContent = "Inbox";
    inbox.appendChild(inboxTitle);
  }

  // create main div function
  static createMain() {
    console.log("create main");
  }

  static showInbox() {
    console.log("show inbox function");
  }
}
