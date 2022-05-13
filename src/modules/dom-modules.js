import Task from "./task.js";
import MainStorage from "./mainStorage.js";

const domModules = (function () {
  "use strict";

  function _createTask(title, dueDate, priority) {
    return new Task(title, dueDate, priority);
  }

  function addTask(title, dueDate, priority) {
    const task = _createTask(title, dueDate, priority);
    MainStorage.addTaskToStorage(task); // Adds task to main storage
    addTaskToDom(title, dueDate, priority);
  }

  function addTaskToDom(title, dueDate, priority) {
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM

    // title
    const taskTitleLabel = document.createElement("p");
    const titleTextNode = document.createTextNode(title);
    taskTitleLabel.appendChild(titleTextNode);
    taskEle.appendChild(taskTitleLabel); // main div appending title

    // due Date
    const taskDueDateLabel = document.createElement("p");
    const dueDateTextNode = document.createTextNode(dueDate);
    taskDueDateLabel.appendChild(dueDateTextNode);
    taskEle.appendChild(taskDueDateLabel);

    // priority
    const taskPriorityLabel = document.createElement("p");
    const priorityTextNode = document.createTextNode(priority);
    taskPriorityLabel.appendChild(priorityTextNode);
    taskEle.appendChild(taskPriorityLabel);

    document.body.appendChild(taskEle);
  }

  return {
    addTaskToDom,
  };
})();

export default domModules;
