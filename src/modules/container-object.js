import Project from "./project.js";

export default class ProjectList {
  constructor() {
    this.defaultProjects = [
      new Project("Inbox"),
      new Project("Today"),
      new Project("This week"),
    ];
    this.userProjects = [];
  }

  addProject(title) {
    const newProject = new Project(title);
    this.projects.push(newProject);
  }
}
