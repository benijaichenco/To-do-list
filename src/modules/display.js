import { format, isAfter, isBefore, startOfWeek, addWeeks } from "date-fns";
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
    Display.createStorage();
    Display.createProjectForm();
    Display.createTaskForm();
    Display.createHeader();
    Display.createContent();
    Display.loadInbox();
  }

  // create new container object:
  static createContainerObject() {
    const containerObject = new ContainerObject();
    Display.containerObject = containerObject;
  }

  // create local storage if it doesnt exist:
  static createStorage() {
    // inbox storage
    if (!localStorage.getItem("inbox")) {
      localStorage.setItem(
        "inbox",
        JSON.stringify(Display.containerObject.defaultProjects[0].taskList)
      );
      console.log("yes");
    }
    const inbox = JSON.parse(localStorage.getItem("inbox"));
    Display.containerObject.defaultProjects[0].taskList = inbox;

    // user projects storage
    if (!localStorage.getItem("projects")) {
      localStorage.setItem("projects", JSON.stringify([]));
    }
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    if (storedProjects.length > 0) {
      for (let i = 0; i < storedProjects.length; i++) {
        Display.containerObject.addProject(storedProjects[i].projectTitle);
        Display.containerObject.userProjects[i].taskList =
          storedProjects[i].taskList;
      }
    }
  }

  // create header:
  static createHeader() {
    const body = document.body;
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    body.appendChild(wrapper);

    const header = document.createElement("header");
    header.classList.add("header");
    wrapper.appendChild(header);

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
    logoText.textContent = "ToDo";
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
    const wrapper = document.querySelector(".wrapper");

    const content = document.createElement("div");
    content.classList.add("content");
    wrapper.appendChild(content);

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

        const inboxButton = document.querySelector(
          ".sidebar-default-project.inbox"
        );
        inboxButton.removeEventListener("click", Display.getTaskList);
        inboxButton.addEventListener("click", Display.getTaskList);

        const todayButton = document.querySelector(
          ".sidebar-default-project.today"
        );
        todayButton.removeEventListener("click", Display.getTodayTasks);
        todayButton.addEventListener("click", Display.getTodayTasks);

        const weekButton = document.querySelector(
          ".sidebar-default-project.this-week"
        );
        weekButton.removeEventListener("click", Display.getThisWeekTasks);
        weekButton.addEventListener("click", Display.getThisWeekTasks);

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

      const addTaskBtnContainer = document.createElement("div");
      addTaskBtnContainer.classList.add("add-task-button-container");
      addTaskBtnContainer.classList.add("active");
      main.appendChild(addTaskBtnContainer);

      const addTaskBtn = document.createElement("button");
      addTaskBtn.classList.add("add-task-button");
      addTaskBtn.removeEventListener("click", Display.addTask);
      addTaskBtn.addEventListener("click", Display.addTask);
      addTaskBtnContainer.appendChild(addTaskBtn);

      const addTaskSpan = document.createElement("span");
      addTaskSpan.classList.add("add-task-icon");
      addTaskBtn.appendChild(addTaskSpan);

      const addTaskBtnImg = document.createElement("img");
      addTaskBtnImg.setAttribute("src", addTaskImg);
      addTaskSpan.appendChild(addTaskBtnImg);

      const addTaskTextContainer = document.createElement("div");
      addTaskTextContainer.classList.add("add-task-text-container");
      addTaskBtn.appendChild(addTaskTextContainer);

      const addTaskText = document.createElement("div");
      addTaskText.classList.add("add-task-button-text");
      addTaskText.textContent = "Add Task";
      addTaskTextContainer.appendChild(addTaskText);

      const tasksContainer = document.createElement("div");
      tasksContainer.classList.add("tasks-container");
      main.appendChild(tasksContainer);
    }

    createSidebar();
    createMain();
  }

  static createProjectForm() {
    // create form
    const body = document.body;

    const layout = document.createElement("div");
    layout.classList.add("project-form-layout");
    layout.removeEventListener("click", () => {
      form.classList.remove("active");
      layout.classList.remove("active");
    });
    layout.addEventListener("click", () => {
      form.classList.remove("active");
      layout.classList.remove("active");
    });
    body.appendChild(layout);

    const form = document.createElement("form");
    form.classList.add("project-form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "get");
    form.removeEventListener("submit", (event) => {
      event.preventDefault();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    body.appendChild(form);

    const titleInput = document.createElement("input");
    titleInput.classList.add("project-title-input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Project Title");
    form.appendChild(titleInput);

    const submitBtn = document.createElement("button");
    submitBtn.removeEventListener("click", Display.submitProject);
    submitBtn.addEventListener("click", Display.submitProject);
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("submit-project-button");
    submitBtn.textContent = "Create";
    form.appendChild(submitBtn);
    //
  }

  static submitProject() {
    const form = document.querySelector(".project-form");
    const layout = document.querySelector(".project-form-layout");
    form.classList.remove("active");
    layout.classList.remove("active");

    const titleInput = document.querySelector(".project-title-input");
    const title = titleInput.value;

    if (title.length > 15) {
      alert("Name too long, max length is 15 characters");
      Display.addProject();
      return;
    }

    if (
      Display.containerObject.userProjects.find(
        (project) => project.projectTitle === title
      )
    ) {
      alert("Name already used");
      Display.addProject();
      return;
    }

    if (title === null || title === "") {
      return;
    }

    const newProject = Display.containerObject.addProject(title);
    const findNewProject = Display.containerObject.userProjects.find(
      (project) => project.projectTitle === title
    );
    titleInput.value = "";

    // push to storage:
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    storedProjects.push(findNewProject);
    localStorage.setItem("projects", JSON.stringify(storedProjects));

    // update user projects buttons
    Display.updateUserProjectButtons();
  }

  static addProject() {
    const form = document.querySelector(".project-form");
    form.classList.add("active");

    const layout = document.querySelector(".project-form-layout");
    layout.classList.add("active");

    document.querySelector(".project-title-input").focus();
  }

  static updateUserProjectButtons() {
    const userProjectsDiv = document.querySelector(".user-projects");
    userProjectsDiv.innerHTML = "";
    const userProjects = Display.containerObject.userProjects;
    for (let project of userProjects) {
      const userProjectContainer = document.createElement("div");
      userProjectContainer.classList.add("user-project-container");
      userProjectsDiv.appendChild(userProjectContainer);

      const projectDivLeft = document.createElement("div");
      projectDivLeft.classList.add("user-project-left");
      userProjectContainer.appendChild(projectDivLeft);

      const projectButton = document.createElement("button");
      projectButton.classList.add("user-project-button");
      projectButton.removeEventListener("click", Display.getTaskList);
      projectButton.addEventListener("click", Display.getTaskList);
      projectDivLeft.appendChild(projectButton);

      const projectButtonDot = document.createElement("div");
      projectButtonDot.classList.add("user-project-dot");
      projectButton.appendChild(projectButtonDot);

      const projectButtonText = document.createElement("div");
      projectButtonText.classList.add("user-project-title");
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
    const findProject = Display.containerObject.userProjects.find(
      (project) => project.projectTitle === projectTitle
    );
    const projectIndex =
      Display.containerObject.userProjects.indexOf(findProject);
    const userConfirm = prompt("Type 'delete' to delete project:", "");
    if (userConfirm === "delete") {
      Display.containerObject.userProjects.splice(projectIndex, 1);
      const storedProjects = JSON.parse(localStorage.getItem("projects"));
      storedProjects.splice(projectIndex, 1);
      localStorage.setItem("projects", JSON.stringify(storedProjects));
      Display.updateUserProjectButtons();
      if (Display.findProject.projectTitle === projectTitle) {
        Display.loadInbox();
      }
    } else return;
  }

  static createTaskForm() {
    const body = document.body;

    const layout = document.createElement("div");
    layout.classList.add("task-form-layout");

    layout.removeEventListener("click", () => {
      form.classList.remove("active");
      layout.classList.remove("active");
    });
    layout.addEventListener("click", () => {
      form.classList.remove("active");
      layout.classList.remove("active");
    });

    body.appendChild(layout);

    const form = document.createElement("form");
    form.classList.add("task-form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "get");
    form.removeEventListener("submit", (event) => {
      event.preventDefault();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    body.appendChild(form);

    const titleInput = document.createElement("input");
    titleInput.classList.add("task-title-input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Task Title");
    form.appendChild(titleInput);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("task-description-input");
    descriptionInput.setAttribute("placeholder", "Description..");
    form.appendChild(descriptionInput);

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-task-button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Add Task";
    submitBtn.removeEventListener("click", Display.submitTask);
    submitBtn.addEventListener("click", Display.submitTask);
    form.appendChild(submitBtn);
  }

  static submitTask() {
    const form = document.querySelector(".task-form");
    const layout = document.querySelector(".task-form-layout");
    form.classList.remove("active");
    layout.classList.remove("active");

    const title = document.querySelector(".task-title-input").value;
    if (title === null || title === "") {
      alert("Please fill a title");
      Display.addTask();
      return;
    }

    if (title.length > 15) {
      alert("Name too long, max length is 15 characters");
      Display.addTask();
      return;
    }

    const description = document.querySelector(".task-description-input").value;

    let date = format(new Date(), "PP");
    let project = Display.findProject.projectTitle;
    Display.findProject.addTask(title, description, date, project, "no");
    if (Display.checkWeek(date)) {
      Display.containerObject.defaultProjects[2].addTask(
        title,
        description,
        date,
        project,
        "no"
      );
    }

    document.querySelector(".task-title-input").value = "";
    document.querySelector(".task-description-input").value = "";
    Display.updateTaskList();
  }

  static getTaskList(e) {
    const addTaskBtnContainer = document.querySelector(
      ".add-task-button-container"
    );
    if (!addTaskBtnContainer.classList.contains("active")) {
      addTaskBtnContainer.classList.add("active");
    }
    const classList = e.currentTarget.parentNode.parentNode.classList.value;
    const userList = Display.containerObject.userProjects;
    const defaultList = Display.containerObject.defaultProjects;

    let listType;
    classList.includes("user")
      ? (listType = userList)
      : (listType = defaultList);

    let title;
    let projectTitle;
    if (listType === userList) {
      title = e.currentTarget.parentNode.parentNode.textContent;
      projectTitle = title.slice(0, -2);
    } else {
      projectTitle = e.currentTarget.textContent;
    }
    Display.findProject = listType.find(
      (project) => project.projectTitle === projectTitle
    );
    Display.updateTaskList();
  }

  static updateTaskList() {
    const taskList = Display.findProject.taskList;
    taskList.sort(Display.compareDates);

    const projectTitleDiv = document.querySelector(".current-project-title");
    projectTitleDiv.textContent = Display.findProject.projectTitle;

    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = "";

    for (let task of taskList) {
      const taskDiv = document.createElement("div");
      taskDiv.removeEventListener("click", Display.expandTask);
      taskDiv.addEventListener("click", Display.expandTask);
      taskDiv.classList.add("task");
      tasksContainer.appendChild(taskDiv);

      const taskLeft = document.createElement("div");
      taskLeft.classList.add("task-left");
      taskDiv.appendChild(taskLeft);

      const markTaskComplete = document.createElement("input");
      markTaskComplete.classList.add("mark-task-complete");
      markTaskComplete.setAttribute("type", "checkbox");
      markTaskComplete.setAttribute("id", `${task.title.replace(/\s/g, "")}`);
      if (task.completed === "yes") {
        markTaskComplete.setAttribute("checked", "");
      }
      markTaskComplete.removeEventListener("change", Display.completeTask);
      markTaskComplete.addEventListener("change", Display.completeTask);
      taskLeft.appendChild(markTaskComplete);

      const taskTitle = document.createElement("label");
      taskTitle.classList.add("task-title");
      taskTitle.setAttribute("for", `${task.title.replace(/\s/g, "")}`);
      taskTitle.textContent = task.title;
      taskLeft.appendChild(taskTitle);

      const taskDescription = document.createElement("div");
      taskDescription.classList.add("task-description");
      taskDescription.textContent = task.description;
      taskDiv.appendChild(taskDescription);

      const taskRight = document.createElement("div");
      taskRight.classList.add("task-right");
      taskDiv.appendChild(taskRight);

      const datePicker = document.createElement("input");
      datePicker.classList.add("task-date");
      datePicker.value = task.date;
      datePicker.setAttribute("type", "date");
      let today = new Date().toISOString().split("T")[0];
      datePicker.setAttribute("min", today);
      datePicker.removeEventListener("change", Display.chooseDate);
      datePicker.addEventListener("change", Display.chooseDate);
      taskRight.appendChild(datePicker);

      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.removeEventListener("click", Display.deleteTask);
      deleteTaskBtn.addEventListener("click", Display.deleteTask);
      deleteTaskBtn.classList.add("delete-task-button");
      taskRight.appendChild(deleteTaskBtn);

      const deleteTaskImg = document.createElement("img");
      deleteTaskImg.setAttribute("src", trashImg);
      deleteTaskBtn.appendChild(deleteTaskImg);

      if (task.completed === "yes") {
        taskDiv.classList.add("complete");
        markTaskComplete.classList.add("active");
      }
    }

    //save tasks in inbox storage
    localStorage.setItem(
      "inbox",
      JSON.stringify(Display.containerObject.defaultProjects[0].taskList)
    );

    // save tasks in user projects storage
    localStorage.setItem(
      "projects",
      JSON.stringify(Display.containerObject.userProjects)
    );
  }

  static completeTask(e) {
    const checkmark = e.target;
    const task = e.target.parentNode.parentNode;
    const title = task.querySelector(".task-title").textContent;
    const findTask = Display.findProject.taskList.find(
      (task) => task.title === title
    );
    if (checkmark.checked) {
      console.log(findTask);
      console.log(checkmark.checked + " " + "checked!");
      checkmark.checked = true;
      task.classList.add("complete");
      findTask.completed = "yes";
    } else {
      console.log(checkmark.checked + " " + "unchecked!");
      task.classList.remove("complete");
      findTask.completed = "no";
    }
    // Display.updateTaskList();
  }

  static expandTask(e) {
    if (e.target.classList.value === "task-description") {
      const task = e.target.parentNode;
      const title = task.querySelector(".task-title");
      const description = task.querySelector(".task-description");
      task.classList.add("active");
      title.classList.add("active");
      description.classList.add("active");
    } else if (e.target.classList.value === "task-description active") {
      const task = e.target.parentNode;
      const title = task.querySelector(".task-title");
      const description = task.querySelector(".task-description");
      task.classList.remove("active");
      title.classList.remove("active");
      description.classList.remove("active");
    }
  }

  static addTask() {
    const form = document.querySelector(".task-form");
    form.classList.add("active");

    const layout = document.querySelector(".task-form-layout");
    layout.classList.add("active");

    document.querySelector(".task-title-input").focus();
  }

  static chooseDate(e) {
    console.log(e.target.parentNode.parentNode);
    console.log(e.target.value);
    const task = e.target.parentNode.parentNode;
    const title = task.querySelector(".task-title").textContent;
    const findTask = Display.findProject.taskList.find(
      (task) => task.title === title
    );
    findTask.date = e.target.value;
    console.log(findTask);
    Display.updateTaskList();
  }

  static checkToday(date) {
    const taskDate = date;
    const formattedDate = format(new Date(taskDate), "P");
    const today = format(new Date(), "P");
    if (formattedDate === today) {
      return true;
    }
  }

  static compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    }
    return 0;
  }

  static getTodayTasks() {
    const addTaskBtnContainer = document.querySelector(
      ".add-task-button-container"
    );
    if (addTaskBtnContainer.classList.contains("active")) {
      addTaskBtnContainer.classList.remove("active");
    }

    const tasks = [];

    const inboxProjectTasks =
      Display.containerObject.defaultProjects[0].taskList;
    const userProjects = Display.containerObject.userProjects;
    for (let project of userProjects) {
      project.taskList.forEach((task) => {
        if (Display.checkToday(task.date)) {
          tasks.push(task);
        }
      });
    }

    inboxProjectTasks.forEach((task) => {
      if (Display.checkToday(task.date)) {
        tasks.push(task);
      }
    });

    Display.containerObject.defaultProjects[1].taskList = tasks;
    Display.findProject = Display.containerObject.defaultProjects[1];
    Display.updateTaskList();
  }

  static checkWeek(date) {
    const taskDate = date;
    const formattedDate = format(new Date(taskDate), "P");
    const weekStart = format(startOfWeek(new Date()), "P");
    const weekAfter = addWeeks(new Date(weekStart), 1);
    const checkAfter = isAfter(new Date(weekAfter), new Date(formattedDate));
    const checkBefore = isBefore(new Date(formattedDate), new Date(weekStart));

    if (checkAfter === true && checkBefore === false) {
      return true;
    }
  }

  static getThisWeekTasks() {
    const addTaskBtnContainer = document.querySelector(
      ".add-task-button-container"
    );
    if (addTaskBtnContainer.classList.contains("active")) {
      addTaskBtnContainer.classList.remove("active");
    }

    const tasks = [];

    const inboxProjectTasks =
      Display.containerObject.defaultProjects[0].taskList;
    const userProjectsTasks = Display.containerObject.userProjects;
    for (let project of userProjectsTasks) {
      project.taskList.forEach((task) => {
        if (Display.checkWeek(task.date)) {
          tasks.push(task);
        }
      });
    }

    inboxProjectTasks.forEach((task) => {
      if (Display.checkWeek(task.date)) {
        tasks.push(task);
      }
    });

    tasks.sort(Display.compareDates);

    Display.containerObject.defaultProjects[2].taskList = tasks;
    Display.findProject = Display.containerObject.defaultProjects[2];
    Display.updateTaskList();
  }

  static deleteTask(e) {
    const task = e.currentTarget.parentNode.parentNode;
    const title = task.querySelector(".task-title").textContent;
    const findTask = Display.findProject.taskList.find(
      (task) => task.title === title
    );
    const taskIndex = Display.findProject.taskList.indexOf(findTask);

    const projectTitle = Display.findProject.taskList[taskIndex].project;

    if (projectTitle === "Inbox") {
      let accept = prompt(`Type "delete" to delete this task`, "");
      if (accept === "delete") {
        Display.containerObject.defaultProjects[0].taskList.splice(
          taskIndex,
          1
        );
      } else return;
    } else {
      let accept = prompt(`Type "delete" to delete this task`, "");
      if (accept === "delete") {
        Display.containerObject.defaultProjects[0].taskList.splice(
          taskIndex,
          1
        );
        const findProject = Display.containerObject.userProjects.find(
          (project) => project.projectTitle === projectTitle
        );

        findProject.taskList.splice(taskIndex, 1);
      }
    }

    if (
      Display.findProject.projectTitle === "This week" ||
      Display.findProject.projectTitle === "Today"
    ) {
      Display.findProject.taskList.splice(taskIndex, 1);
    }
    Display.updateTaskList();
  }

  static loadInbox() {
    Display.findProject = Display.containerObject.defaultProjects[0];
    Display.updateTaskList();
  }
}
