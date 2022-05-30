import Task from "./task.js";
import MainStorage from "./mainStorage.js";
import Project from "./Project.js";

const domModules = (function () {
  "use strict";

  const taskContainer = document.getElementById("inbox-task-container");

  // Where all the projects are listed
  const projectContainer = document.querySelector(
    ".bottom-sidebar-section > ul"
  );

  function initButtons() {
    taskContainer.addEventListener("click", _checkTaskInteraction);
    projectContainer.addEventListener("click", _checkProjectInteraction);
  }

  function _createTask(title, dueDate, priority, id) {
    return new Task(title, dueDate, priority, id);
  }

  function addTask(title, dueDate, priority, id) {
    const task = _createTask(title, dueDate, priority, id);
    MainStorage.addTaskToStorage(task); // Adds task to main storage
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

  function setupLabel(text) {
    const label = document.createElement("li");
    const textNode = document.createTextNode(text);
    label.appendChild(textNode);
    label.className = "label";
    return label;
  }

  function _checkTaskInteraction(e) {
    if (e.target.classList.contains("task-delete-btn")) {
      e.target.parentElement.remove();
    }
  }

  function _checkProjectInteraction(e) {
    console.log(e.target);
    if (e.target.classList.contains("p-delete-btn")) {
      e.target.parentElement.remove();
    }

    // pass in parent element (corresponding project) to delete it from storage
    MainStorage.deleteProject(e.target.parentElement);
  }

  function _createTaskDeleteBtn() {
    // delete section
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.className = "task-delete-btn";
    deleteTaskButton.setAttribute("data-task-btn", true);
    return deleteTaskButton;
  }

  // function _styleTask(id) {
  //   let tasks = document.querySelectorAll(`div.task[name]`);
  //   for (let i = 0; i < tasks.length; i++) {
  //     console.log(tasks[i]);
  //   }
  // }

  function _addProjectToDom(title) {
    const project = document.createElement("div");
    project.classList.add("project");
    const nameLabel = setupLabel(title);
    project.appendChild(nameLabel);

    // delete button for project
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "D";
    deleteBtn.classList.add("p-delete-btn");
    project.appendChild(deleteBtn);

    projectContainer.appendChild(project);
  }

  function _addTaskToDom(title, dueDate, priority, id) {
    const task = document.createElement("div"); // div element that is going to be appended to DOM
    task.classList.add("task");

    // const taskBtn = _createTaskDeleteBtn(id);
    // const tasks = document.querySelectorAll("#inbox-task-container > .task");

    // console.log(tasks);

    // const lastTask = tasks[tasks.length - 1]; // get task we just appended to DOM

    // console.log("last task: ", lastTask);

    // lastTask.appendChild(taskBtn); // use most recent task and add btn to it

    // <button class="task-delete-btn" data-task-btn>Delete</button>

    // querySelector .task last element > button

    const labelDiv = document.createElement("div");
    labelDiv.classList.add("task-content");

    const titleLabel = setupLabel(title);
    const dueDateLabel = setupLabel(dueDate);
    const priorityLabel = setupLabel(priority);
    const taskDeleteBtn = _createTaskDeleteBtn(id);

    labelDiv.appendChild(titleLabel);
    labelDiv.appendChild(dueDateLabel);
    labelDiv.appendChild(priorityLabel);

    task.appendChild(labelDiv);
    task.appendChild(taskDeleteBtn);

    task.setAttribute(`name`, id); // set id of task;

    // _styleTask(id); // style task by selecting element from dom by its id

    taskContainer.appendChild(task);
  }

  return {
    initButtons,
    addTask,
    addProject,
  };
})();

export default domModules;
