import domModules from "./dom-modules.js";
import "../stylesheets/styles.css";
import { v4 as uuidv4 } from "uuid";

// https://zakarya-mks.github.io/ToDoers/

const createTaskBtn = document.getElementById("create-task-btn");
const createProjectBtn = document.getElementById("create-project-btn");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

const priorityInputs = [...document.querySelectorAll('input[name="priority"]')];

const toggleTaskInterfaceBtn = document.querySelectorAll(
  ".toggle-task-interface-btn"
);
const toggleProjectInterfaceBtn = document.querySelectorAll(
  ".toggle-project-interface-btn"
);
const createTaskInterfaceContainer = document.getElementById(
  "create-task-interface-container"
);

const createProjectInterfaceContainer = document.getElementById(
  "create-project-interface-container"
);

const Interface = (function () {
  "use strict";

  function _selectPriorityInput() {
    const selectedPriorityInput = priorityInputs.filter((priorityInput) => {
      return priorityInput.checked;
    });
    if (!selectedPriorityInput[0]) return;
    return selectedPriorityInput[0];
  }

  function _toggleCreateTaskInterfaceContainer() {
    if (createTaskInterfaceContainer.classList.contains("d-none")) {
      createTaskInterfaceContainer.classList.remove("d-none");
    } else {
      createTaskInterfaceContainer.classList.add("d-none");
    }
  }
  function _toggleCreateProjectInterfaceContainer() {
    if (createProjectInterfaceContainer.classList.contains("d-none")) {
      createProjectInterfaceContainer.classList.remove("d-none");
    } else {
      createProjectInterfaceContainer.classList.add("d-none");
    }
  }

  function initInterfaceBtns() {
    // addTask
    createTaskBtn.addEventListener("click", function () {
      _toggleCreateTaskInterfaceContainer();
      const priorityInput = _selectPriorityInput();

      if (!titleInput.value || !priorityInput) return;
      let TASK_ID = uuidv4();

      domModules.addTask(
        titleInput.value,
        dueDateInput.value,
        priorityInput.value,
        TASK_ID
      );
    });

    createProjectBtn.addEventListener("click", function () {
      _toggleCreateProjectInterfaceContainer();
    });

    // Toggle Create Task Interface
    for (let i = 0; i < toggleTaskInterfaceBtn.length; i++) {
      toggleTaskInterfaceBtn[i].addEventListener(
        "click",
        _toggleCreateTaskInterfaceContainer
      );
    }
    // Toggle Create Project Interface
    for (let i = 0; i < toggleProjectInterfaceBtn.length; i++) {
      toggleProjectInterfaceBtn[i].addEventListener(
        "click",
        _toggleCreateProjectInterfaceContainer
      );
    }

    domModules.initButtons();
  }

  return { initInterfaceBtns };
})();

// function initTaskBtn() {
//   const taskButtons = document.querySelectorAll("[data-task-button]");

//   taskButtons.forEach((taskBtn) =>
//     taskBtn.addEventListener("click", function () {
//       MainStorage.deleteTask();
//     })
//   );
// }

export default Interface;
