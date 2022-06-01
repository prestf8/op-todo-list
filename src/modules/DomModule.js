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

  // function that adds task to dom given a name, dueDate, priority value, and id
  function _addTaskToDom(title, dueDate, priority, id) {
    const task = document.createElement("div"); // div element that is going to be appended to DOM

    // every task gets a class of "task"
    task.classList.add("task");

    // div container to group all the labels
    const labelDiv = document.createElement("div");
    labelDiv.classList.add("task-content");

    // create all the elements in the task
    const titleLabel = _setupLabel(title);
    const dueDateLabel = _setupLabel(dueDate);
    const priorityLabel = _setupLabel(priority);
    const taskDeleteBtn = _createTaskDeleteBtn(id);

    // append all the created elements and the label container to the DOM
    labelDiv.appendChild(titleLabel);
    labelDiv.appendChild(dueDateLabel);
    labelDiv.appendChild(priorityLabel);
    task.appendChild(labelDiv);
    task.appendChild(taskDeleteBtn);

    // name=id attribute for task;
    task.setAttribute(`name`, id);

    // add task to DOM (to "_taskContainer")
    _taskContainer.appendChild(task);
  }

  // function that adds project to dom using a name
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
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.className = "task-delete-btn";
    deleteTaskButton.setAttribute("data-task-btn", true);
    return deleteTaskButton;
  }

  // event listener that is called when you click on a task
  function _checkTaskInteraction(e) {
    // this block is called if element clicked on is a task delete button
    if (e.target.classList.contains("task-delete-btn")) {
      // remove parent element (corresponding task)
      e.target.parentElement.remove();
    }
  }

  // event listener that is called when you click on a project
  function _checkProjectInteraction(e) {
    // this block is called if element clicked on is a project delete button
    if (e.target.classList.contains("p-delete-btn")) {
      // remove parent element (corresponding project)
      e.target.parentElement.remove();
    }

    // pass in parent element (corresponding project) to delete it from storage
    MainStorage.deleteProject(e.target.parentElement);
  }

  // public method to set interactivity of clicking task/project and different parts of them
  function initButtons() {
    _taskContainer.addEventListener("click", _checkTaskInteraction);
    _projectContainer.addEventListener("click", _checkProjectInteraction);
  }

  // public method that creates task and adds it to the dom and storage
  function addTask(title, dueDate, priority, id) {
    // create new task object
    const task = new Task(title, dueDate, priority, id);

    // add created task object to storage
    MainStorage.addTaskToStorage(task);

    // add task to dom
    _addTaskToDom(title, dueDate, priority, id);
  }

  // public method that creates project and adds it to the dom and storage
  function addProject(title) {
    // if statement that runs only if no other project exists with this title
    if (MainStorage.checkValidProject(title)) {
      // create new project
      const newProject = new Project(title);
      // add project to storage by passing in project itself
      MainStorage.addProjectToStorage(newProject);
      // add project to dom using only title
      _addProjectToDom(title);
    }
  }

  return {
    initButtons,
    addTask,
    addProject,
  };
})();

export default DomModule;