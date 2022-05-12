import Task from "./task.js";
import MainStorage from "./mainStorage.js";

const domModules = (function () {
  "use strict";

  function _createTask(title, dueDate, priority) {
    return new Task(title, dueDate, priority);
  }

  function addTaskToDom(title, dueDate, priority) {
    const task = _createTask(title, dueDate, priority);

    MainStorage.addTaskToStorage(task); // Adds task to main storage

    const taskEle = document.createElement("div");
    const titleTextNode = document.createTextNode(title);
    const dueDateTextNode = document.createTextNode(dueDate);
    const priorityTextNode = document.createTextNode(priority);
    taskEle.appendChild(titleTextNode);
    taskEle.appendChild(dueDateTextNode);
    taskEle.appendChild(priorityTextNode);
    document.body.appendChild(taskEle);
  }

  return {
    addTaskToDom,
  };
})();

export default domModules;
