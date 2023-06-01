import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description) {
    let dueDate = prompt("Date:", "yyyy, mm, dd");
    dueDate = format(new Date(dueDate), "P");
    const newTask = new Task(title, description, dueDate);
    this.taskList.push(newTask);
  }

  static loadInbox() {
    const inbox = new Project("Inbox");
    return inbox;
  }
}
