import Task from "./task.js";
import MainStorage from "./mainStorage.js";
import DynamicStyling from "./dynamicStyling.js";

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

  function _styleTask(task) {
    querySelectorAll()
  }

  function _addTaskToDom(title, dueDate, priority, id) {
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM

    const titleLabel = setupLabel(title);
    const dueDateLabel = setupLabel(dueDate);
    const priorityLabel = setupLabel(priority);
    taskEle.appendChild(titleLabel); // main div appending title
    taskEle.appendChild(dueDateLabel);
    taskEle.appendChild(priorityLabel);

    const taskDeleteBtn = _createTaskDeleteBtn(id);
    taskEle.appendChild(taskDeleteBtn);

    console.log(taskEle);

    document.body.appendChild(taskEle);
  }

  return {
    addTask,
  };
})();

export default domModules;
