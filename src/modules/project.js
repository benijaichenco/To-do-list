import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description) {
    let year = prompt("Year:", "");
    let month = prompt("Month:", "");
    let day = prompt("Day:", "");
    let dueDate = `${year}, ${month}, ${day}`;
    dueDate = format(new Date(dueDate), "PP");
    const newTask = new Task(title, description, dueDate);
    this.taskList.push(newTask);
  }

  static loadInbox() {
    const inbox = new Project("Inbox");
    return inbox;
  }
}
