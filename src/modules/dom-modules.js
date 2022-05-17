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

  function _styleTask(id) {
    let taskContent = document.querySelectorAll(`div[data-id='${id}'] *`);
    for (let i = 0; i < taskContent.length; i++) {
      if ((taskContent[i].className = "task-label")) {
        console.log("task label");
      } else {
        console.log("task delete btn");
      }
    }
  }

  function _addTaskToDom(title, dueDate, priority, id) {
    const taskEle = document.createElement("div"); // div element that is going to be appended to DOM

    const titleLabel = setupLabel(title);
    const dueDateLabel = setupLabel(dueDate);
    const priorityLabel = setupLabel(priority);
    const taskDeleteBtn = _createTaskDeleteBtn(id);

    _styleTask(id); // style task by selecting element from dom by its id

    // appending content of task to the task itself
    taskEle.appendChild(titleLabel); // main div appending title
    taskEle.appendChild(dueDateLabel);
    taskEle.appendChild(priorityLabel);
    taskEle.appendChild(taskDeleteBtn);

    console.log(taskEle);

    taskEle.setAttribute(`data-id`, id); // set id of task;

    document.body.appendChild(taskEle);
  }

  return {
    addTask,
  };
})();

export default domModules;
