import Task from "./task.js";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description) {
    const newTask = new Task(title, description);
    this.taskList.push(newTask);
  }

  static loadInbox() {
    const inbox = new Project("Inbox");
    return inbox;
  }
}
