import Task from "./task.js";
import MainStorage from "./mainStorage.js";
import DynamicStyling from "./dynamicStyling.js";
import { v4 as uuidv4 } from "uuid";

// deleting code: if project === "Home" delete project from home; else delete project from home and from that project

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
    const TASK_ID = uuidv4();
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM
    taskEle.setAttribute("data-task-id", TASK_ID);

    // title
    const taskTitleLabel = document.createElement("p");
    const titleTextNode = document.createTextNode(title);
    taskTitleLabel.appendChild(titleTextNode);

    // due Date
    const taskDueDateLabel = document.createElement("p");
    const dueDateTextNode = document.createTextNode(dueDate);
    taskDueDateLabel.appendChild(dueDateTextNode);

    // priority
    const taskPriorityLabel = document.createElement("p");
    const priorityTextNode = document.createTextNode(priority);
    taskPriorityLabel.appendChild(priorityTextNode);

    taskEle.appendChild(taskTitleLabel); // main div appending title
    taskEle.appendChild(taskDueDateLabel);
    taskEle.appendChild(taskPriorityLabel);
    document.body.appendChild(taskEle);
  }

  return {
    addTaskToDom,
  };
})();

export default domModules;
