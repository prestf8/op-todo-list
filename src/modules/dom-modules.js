import Task from "./task.js";
import MainStorage from "./mainStorage.js";

// deleting code: if project === "Home" delete project from home; else delete project from home and from that project

const domModules = (function () {
  "use strict";

  function _createTask(title, dueDate, priority, id) {
    return new Task(title, dueDate, priority, id);
  }

  function addTask(title, dueDate, priority, id) {
    const task = _createTask(title, dueDate, priority, id);
    MainStorage.addTaskToStorage(task); // Adds task to main storage
    _addTaskToDom(title, dueDate, priority, id);
  }

  function setupLabel(text) {
    const label = document.createElement("p");
    const textNode = document.createTextNode(text);
    label.appendChild(textNode);
    label.className = "task-label";
    return label;
  }

  function _createTaskDeleteBtn(id) {
    // delete section
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.addEventListener("click", function () {
      MainStorage.deleteTask(id);
    });
    deleteTaskButton.className = "task-delete-btn";
    return deleteTaskButton;
  }

  function _styleTask(id) {
    let tasks = document.querySelectorAll(`div.task[name]`);
    for (let i = 0; i < tasks.length; i++) {
      console.log(tasks[i]);
    }
  }

  function _addTaskToDom(title, dueDate, priority, id) {
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM
    taskEle.className = "task";

    document.getElementById(
      "inbox-task-container"
    ).innerHTML += `<div class="task"><p>${title}</p><p>${dueDate}</p><p>${priority}</p><p>${id}</p></div>`;

    // const titleLabel = setupLabel(title);
    // const dueDateLabel = setupLabel(dueDate);
    // const priorityLabel = setupLabel(priority);
    // const taskDeleteBtn = _createTaskDeleteBtn(id);

    // // appending content of task to the task itself
    // taskEle.appendChild(titleLabel); // main div appending title
    // taskEle.appendChild(dueDateLabel);
    // taskEle.appendChild(priorityLabel);
    // taskEle.appendChild(taskDeleteBtn);

    // taskEle.setAttribute(`name`, id); // set id of task;

    // _styleTask(id); // style task by selecting element from dom by its id

    // document.body.appendChild(taskEle);
  }

  return {
    addTask,
  };
})();

export default domModules;
