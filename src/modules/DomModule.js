import Task from "./Task.js";
import MainStorage from "./MainStorage.js";
import Project from "./Project.js";

const DomModule = (function () {
  "use strict";

  // Container that lists all tasks
  const _taskContainer = document.getElementById("inbox-task-container");

  // Container that lists all projects
  const _projectContainer = document.querySelector(
    ".bottom-sidebar-section > ul"
  );

  // Create and setup label
  function _setupLabel(text) {
    const label = document.createElement("li");
    const textNode = document.createTextNode(text);
    label.appendChild(textNode);

    // every label (whether it belongs to a project or a task) gets a class of "label"
    label.className = "label";
    return label;
  }

  function _addProjectToDom(title) {
    // create project div
    const project = document.createElement("div");

    // every project has a class of "project"
    project.classList.add("project");

    // project name
    const nameLabel = _setupLabel(title);
    project.appendChild(nameLabel);

    // delete button for project
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "D";
    deleteBtn.classList.add("p-delete-btn");
    project.appendChild(deleteBtn);

    // add project to DOM (to "_projectContainer")
    _projectContainer.appendChild(project);
  }

  // create delete task button for tasks
  function _createTaskDeleteBtn() {
    // delete section
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.className = "task-delete-btn";
    deleteTaskButton.setAttribute("data-task-btn", true);
    return deleteTaskButton;
  }

  function _addTaskToDom(title, dueDate, priority, id) {
    const task = document.createElement("div"); // div element that is going to be appended to DOM
    task.classList.add("task");

    const labelDiv = document.createElement("div");
    labelDiv.classList.add("task-content");

    const titleLabel = _setupLabel(title);
    const dueDateLabel = _setupLabel(dueDate);
    const priorityLabel = _setupLabel(priority);
    const taskDeleteBtn = _createTaskDeleteBtn(id);

    labelDiv.appendChild(titleLabel);
    labelDiv.appendChild(dueDateLabel);
    labelDiv.appendChild(priorityLabel);

    task.appendChild(labelDiv);
    task.appendChild(taskDeleteBtn);

    task.setAttribute(`name`, id); // set id of task;

    // _styleTask(id); // style task by selecting element from dom by its id

    _taskContainer.appendChild(task);
  }

  // event listener that is called when you click on a task
  function _checkTaskInteraction(e) {
    if (e.target.classList.contains("task-delete-btn")) {
      e.target.parentElement.remove();
    }
  }

  // event listener that is called when you click on a project
  function _checkProjectInteraction(e) {
    // if statement if element is the delete button of a project
    if (e.target.classList.contains("p-delete-btn")) {
      // remove parent element (corresponding project)
      e.target.parentElement.remove();
    }

    // pass in parent element (corresponding project) to delete it from storage
    MainStorage.deleteProject(e.target.parentElement);
  }

  function initButtons() {
    _taskContainer.addEventListener("click", _checkTaskInteraction);
    _projectContainer.addEventListener("click", _checkProjectInteraction);
  }

  function addTask(title, dueDate, priority, id) {
    // create new task object
    const task = new Task(title, dueDate, priority, id);

    // add created task object to storage
    MainStorage.addTaskToStorage(task);
    _addTaskToDom(title, dueDate, priority, id);
  }

  function addProject(title) {
    if (MainStorage.checkValidProject(title)) {
      const newProject = new Project(title);
      MainStorage.addProjectToStorage(newProject);
      _addProjectToDom(title);
    }
    console.log(MainStorage.getProjectStorage());
  }

  // function _styleTask(id) {
  //   let tasks = document.querySelectorAll(`div.task[name]`);
  //   for (let i = 0; i < tasks.length; i++) {
  //     console.log(tasks[i]);
  //   }
  // }

  return {
    initButtons,
    addTask,
    addProject,
  };
})();

export default DomModule;
