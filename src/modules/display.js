import { format } from "date-fns";
import Project from "./project.js";
import Task from "./task.js";
import logo from "../images/logo.png";
import plusSign from "../images/plus-circle.png";
import inboxImg from "../images/inbox.png";
import addTaskImg from "../images/pencil-plus.svg";
import trashIcon from "../images/trash.svg";

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
    const container = document.querySelector(".container");

    const main = document.createElement("div");
    main.classList.add("main");
    container.appendChild(main);
    createAddTask();
    createTaskList();

    // create add task button container inside main function
    function createAddTask() {
      // add task button container
      const addTaskContainer = document.createElement("div");
      addTaskContainer.classList.add("add-task-container");
      main.appendChild(addTaskContainer);

      const btn = document.createElement("button");
      btn.classList.add("add-task-button");
      addTaskContainer.appendChild(btn);

      const btnSpan = document.createElement("span");
      btnSpan.classList.add("add-task-icon");
      btn.appendChild(btnSpan);

      const btnImg = document.createElement("img");
      btnImg.setAttribute("src", addTaskImg);
      btnSpan.appendChild(btnImg);

      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
      btn.appendChild(textContainer);

      const btnText = document.createElement("div");
      btnText.classList.add("add-task-button-text");
      btnText.textContent = "Add task";
      textContainer.appendChild(btnText);
    }

    // create task list inside main function
    function createTaskList() {
      const listContainer = document.createElement("div");
      listContainer.classList.add("main-tasks");
      main.appendChild(listContainer);

      const task = document.createElement("div");
      task.classList.add("task");
      listContainer.appendChild(task);

      // left task content
      const taskLeft = document.createElement("div");
      taskLeft.classList.add("task-left");
      task.appendChild(taskLeft);

      const checkBtn = document.createElement("button");
      checkBtn.classList.add("task-check");
      taskLeft.appendChild(checkBtn);

      const taskTitle = document.createElement("div");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = "This is a task";
      taskLeft.appendChild(taskTitle);

      // right task content
      const taskRight = document.createElement("div");
      taskRight.classList.add("task-right");
      task.appendChild(taskRight);

      const date = document.createElement("div");
      date.classList.add("task-date");
      date.textContent = `${format(new Date(), "P")}`;
      taskRight.appendChild(date);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-task-button");
      taskRight.appendChild(deleteBtn);

      const deleteBtnImg = document.createElement("img");
      deleteBtnImg.setAttribute("src", trashIcon);
      deleteBtn.appendChild(deleteBtnImg);
    }
  }

  static showInbox() {
    console.log("show inbox function");
  }
}
