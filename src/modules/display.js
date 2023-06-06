import { format } from "date-fns";
import ContainerObject from "./container-object.js";
import logoImg from "../images/logo.png";
import addProjectImg from "../images/plus-circle.png";
import inboxImg from "../images/inbox.svg";
import todayImg from "../images/today.svg";
import thisWeekImg from "../images/week.svg";
import addTaskImg from "../images/pencil-plus.svg";
import trashImg from "../images/trash.svg";

// Display property names:
//  Diplay.containerObject -> the container object loaded from 'container-object.js'.

export default class Display {
  // load home page:
  static loadHomePage() {
    Display.createContainerObject();
    Display.createHeader();
    Display.createContent();
  }

  // create new container object:
  static createContainerObject() {
    const containerObject = new ContainerObject();
    Display.containerObject = containerObject;
  }

  // create header:
  static createHeader() {
    const body = document.body;

    const header = document.createElement("header");
    header.classList.add("header");
    body.appendChild(header);

    const headerLeft = document.createElement("div");
    headerLeft.classList.add("header-left");
    header.appendChild(headerLeft);

    const logoBtn = document.createElement("button");
    logoBtn.classList.add("logo-button");
    headerLeft.appendChild(logoBtn);

    const logo = document.createElement("img");
    logo.classList.add("logo");
    logo.setAttribute("src", logoImg);
    logoBtn.appendChild(logo);

    const logoText = document.createElement("h1");
    logoText.classList.add("logo-text");
    logoText.textContent = "To-Do";
    logoBtn.appendChild(logoText);

    const headerRight = document.createElement("div");
    headerRight.classList.add("header-right");
    header.appendChild(headerRight);

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project");
    addProjectBtn.removeEventListener("click", Display.addProject);
    addProjectBtn.addEventListener("click", Display.addProject);
    headerRight.appendChild(addProjectBtn);

    const addProjectBtnTextContainer = document.createElement("div");
    addProjectBtnTextContainer.classList.add("add-project-btn-text-container");
    addProjectBtn.appendChild(addProjectBtnTextContainer);

    const addProjectBtnText = document.createElement("div");
    addProjectBtnText.classList.add("add-project-btn-text");
    addProjectBtnText.textContent = "Add Project";
    addProjectBtnTextContainer.appendChild(addProjectBtnText);

    const plusSignSpan = document.createElement("span");
    plusSignSpan.classList.add("plus-sign");
    addProjectBtn.appendChild(plusSignSpan);

    const addProjectBtnImg = document.createElement("img");
    addProjectBtnImg.classList.add("add-project-img");
    addProjectBtnImg.setAttribute("src", addProjectImg);
    plusSignSpan.appendChild(addProjectBtnImg);
  }

  // create content:
  static createContent() {
    const body = document.body;

    const content = document.createElement("div");
    content.classList.add("content");
    body.appendChild(content);

    // create sidebar inside content div:
    function createSidebar() {
      const content = document.querySelector(".content");

      const sidebar = document.createElement("div");
      sidebar.classList.add("sidebar");
      content.appendChild(sidebar);

      const defaultProjectsDiv = document.createElement("div");
      defaultProjectsDiv.classList.add("default-projects");
      sidebar.appendChild(defaultProjectsDiv);

      const userProjectsDiv = document.createElement("div");
      userProjectsDiv.classList.add("user-projects");
      sidebar.appendChild(userProjectsDiv);

      // create default projects buttons:
      function createDefaultProjectButtons() {
        const defaultProjectsDiv = document.querySelector(".default-projects");

        for (let project of Display.containerObject.defaultProjects) {
          const projectButton = document.createElement("button");
          projectButton.setAttribute("id", "default");
          projectButton.classList.add("sidebar-default-project");
          projectButton.classList.add(
            project.projectTitle.replace(/\s/g, "-").toLowerCase()
          );
          projectButton.removeEventListener("click", Display.updateTaskList);
          projectButton.addEventListener("click", Display.updateTaskList);
          defaultProjectsDiv.appendChild(projectButton);

          const buttonIconDiv = document.createElement("div");
          buttonIconDiv.classList.add("sidebar-project-icon");
          projectButton.appendChild(buttonIconDiv);

          const buttonIcon = document.createElement("img");
          buttonIconDiv.appendChild(buttonIcon);

          const buttonTitle = document.createElement("div");
          buttonTitle.classList.add("sidebar-project-title");
          buttonTitle.textContent = `${project.projectTitle}`;
          projectButton.appendChild(buttonTitle);
        }

        const inboxButtonIcon = document.querySelector(
          ".default-projects .inbox img"
        );
        inboxButtonIcon.setAttribute("src", inboxImg);

        const todayButtonIcon = document.querySelector(
          ".default-projects .today img"
        );
        todayButtonIcon.setAttribute("src", todayImg);

        const thisweekProjectIcon = document.querySelector(
          ".default-projects .this-week img"
        );
        thisweekProjectIcon.setAttribute("src", thisWeekImg);
      }

      createDefaultProjectButtons();
      Display.updateUserProjectButtons();
    }

    // create main inside content div:
    function createMain() {
      const content = document.querySelector(".content");

      const main = document.createElement("div");
      main.classList.add("main");
      content.appendChild(main);

      const projectTitleContainer = document.createElement("div");
      projectTitleContainer.classList.add("current-project-title");
      main.appendChild(projectTitleContainer);

      const addTaskContainer = document.createElement("div");
    }

    createSidebar();
    createMain();
  }

  static addProject() {
    const title = prompt("project title", "");
    const newProject = Display.containerObject.addProject(title);
    const findNewProject = Display.containerObject.userProjects.find(
      (project) => project.projectTitle === title
    );
    const newProjectIndex =
      Display.containerObject.userProjects.indexOf(findNewProject);
    console.log(
      `Adding "${title}" to user projects, with index of ${newProjectIndex}:`
    );
    console.log(findNewProject);
    Display.updateUserProjectButtons();
  }

  static updateUserProjectButtons() {
    const userProjectsDiv = document.querySelector(".user-projects");
    userProjectsDiv.innerHTML = "";
    const userProjects = Display.containerObject.userProjects;
    for (let project of userProjects) {
      console.log(project.projectTitle);
      console.log(userProjectsDiv);

      const userProjectContainer = document.createElement("div");
      userProjectContainer.classList.add("user-project-container");
      userProjectsDiv.appendChild(userProjectContainer);

      const projectDivLeft = document.createElement("div");
      projectDivLeft.classList.add("user-project-left");
      userProjectContainer.appendChild(projectDivLeft);

      const projectButton = document.createElement("button");
      projectButton.classList.add("user-project-button");
      projectButton.removeEventListener("click", Display.updateTaskList);
      projectButton.addEventListener("click", Display.updateTaskList);
      projectDivLeft.appendChild(projectButton);

      const projectButtonDot = document.createElement("div");
      projectButtonDot.classList.add("user-project-dot");
      projectButton.appendChild(projectButtonDot);

      const projectButtonText = document.createElement("div");
      projectButtonText.classList.add("sidebar-project-title");
      projectButtonText.textContent = project.projectTitle;
      projectButton.appendChild(projectButtonText);

      const projectDivRight = document.createElement("div");
      projectDivRight.classList.add("user-project-right");
      userProjectContainer.appendChild(projectDivRight);

      const deleteProject = document.createElement("button");
      deleteProject.classList.add("delete-project");
      deleteProject.textContent = "🞬";
      deleteProject.removeEventListener("click", Display.deleteProject);
      deleteProject.addEventListener("click", Display.deleteProject);
      projectDivRight.appendChild(deleteProject);
    }
  }

  static deleteProject(e) {
    const title = e.target.parentNode.parentNode.textContent;
    const projectTitle = title.slice(0, -2);
    console.log(projectTitle);
    const findProject = Display.containerObject.userProjects.find(
      (project) => project.projectTitle === projectTitle
    );
    const projectIndex =
      Display.containerObject.userProjects.indexOf(findProject);
    console.log(findProject);
    console.log(projectIndex);
    const userConfirm = prompt("Type 'delete' to delete project:", "");
    if (userConfirm === "delete") {
      Display.containerObject.userProjects.splice(projectIndex, 1);
      console.log(Display.containerObject.userProjects);
      Display.updateUserProjectButtons();
    } else return;
  }

  static updateTaskList() {
    console.log("updating task list");
  }
}
