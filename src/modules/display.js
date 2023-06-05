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
}
