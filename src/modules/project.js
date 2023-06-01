import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description) {
    const dateCreated = format(new Date(), "Pp");
    const newTask = new Task(title, description, dateCreated);
    this.taskList.push(newTask);
  }

  static loadInbox() {
    const inbox = new Project("Inbox");
    return inbox;
  }
}
