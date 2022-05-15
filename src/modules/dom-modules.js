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
    addTaskToDom(title, dueDate, priority);
  }

  function setupLabel(text) {
    const label = document.createElement("p");
    const textNode = document.createTextNode(text);
    label.appendChild(textNode);
    return label;
  }

  function addTaskToDom(title, dueDate, priority) {
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM

    const titleLabel = setupLabel(title);
    const dueDateLabel = setupLabel(dueDate);
    const priorityLabel = setupLabel(priority);
    taskEle.appendChild(titleLabel); // main div appending title
    taskEle.appendChild(dueDateLabel);
    taskEle.appendChild(priorityLabel);

    document.body.appendChild(taskEle);

    const storage1 = MainStorage.getStorage();
    console.log(storage1[0].getId());

    // DynamicStyling.styleTask(TASK_ID); // Style task after task is added to DOM
  }

  return {
    addTask,
  };
})();

export default domModules;
