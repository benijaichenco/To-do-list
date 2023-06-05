import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description, priority) {
    // let dueDate = `${this.getDate().year()}, ${this.getDate().month()}, ${this.getDate().day()}`;
    // dueDate = format(new Date(dueDate), "PP");
    let dueDate = new Date();
    const newTask = new Task(title, description, dueDate, priority);
    this.taskList.push(newTask);
  }

  getDate() {
    const year = () => prompt("Year:", "");
    const month = () => prompt("Month:", "");
    const day = () => prompt("Day:", "");
    return {
      year,
      month,
      day,
    };
  }
}
