import Task from "./task.js";

export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.taskList = [];
  }

  addTask(title, description, date, project, completed) {
    const newTask = new Task(title, description, date, project, completed);
    this.taskList.push(newTask);
  }
}
