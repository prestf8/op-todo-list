import DomModule from "./DomModule.js";
import MainStorage from "./MainStorage.js"
import "../stylesheets/styles.css";
import { v4 as uuidv4 } from "uuid";

// https://zakarya-mks.github.io/ToDoers/

// interface module
const Interface = (function () {
  "use strict";

  // DOM elements
  const createTaskBtn = document.getElementById("create-task-btn");
  const createProjectBtn = document.getElementById("create-project-btn");
  const titleInput = document.getElementById("title-input");
  const projectTitleInput = document.getElementById("project-input-name");
  const dueDateInput = document.getElementById("due-date-input");
  const selectedProject = document.getElementById("project-select"); // project from <select> option where tasks are added to
  const priorityInputs = [
    ...document.querySelectorAll('input[name="priority"]'),
  ];
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

  // check if at least one of the radio buttons when creating a task is selected
  function _selectPriorityInput() {
    const selectedPriorityInput = priorityInputs.filter((priorityInput) => {
      return priorityInput.checked;
    });
    if (!selectedPriorityInput[0]) return;
    return selectedPriorityInput[0];
  }

  // Toggles visibility of the create task interface
  function _toggleCreateTaskInterfaceContainer() {
    if (createTaskInterfaceContainer.classList.contains("d-none")) {
      createTaskInterfaceContainer.classList.remove("d-none");
    } else {
      createTaskInterfaceContainer.classList.add("d-none");
    }
  }

  // Toggles visibility of the create project interface
  function _toggleCreateProjectInterfaceContainer() {
    if (createProjectInterfaceContainer.classList.contains("d-none")) {
      createProjectInterfaceContainer.classList.remove("d-none");
    } else {
      createProjectInterfaceContainer.classList.add("d-none");
    }
  }

  function _formatDueDate() {
    const dueDate = dueDateInput.value;
    let currentYear;
    let currentMonth;
    let currentDay;

    // if no dueDate was inputted
    if (!dueDate) {
      const date = new Date();
      currentYear = date.getFullYear();

      // // .getMonth() returns the numerical version of a month so we need to use an array to find the corresponding month in words
      // const month = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];
      // let currentMonth = month[date.getMonth()];

      currentMonth = date.getMonth() + 1;

      currentDay = date.getDay();
    } else {
      // split date input into array of year, month, and day
      let dueDateSplit = dueDate.split("-");

      // initialize variable from this array
      currentYear = dueDateSplit[0];
      currentMonth = parseInt(dueDateSplit[1], 10);
      currentDay = parseInt(dueDateSplit[2], 10);
    }

    // after initializing variables, return in this format
    return `${currentMonth}/${currentDay}/${currentYear}`;
  }

  // reset inputs after adding project
  function _resetProjectFields() {
    projectTitleInput.value = "";
  }

  // reset inputs after adding task
  function _resetTaskFields() {
    titleInput.value = "";
    priorityInputs.forEach((priorityInput) => (priorityInput.checked = false));
  }

  function initInterfaceBtns() {
    // Event Listener for creating tasks when you click
    createTaskBtn.addEventListener("click", function () {
      // obtain value of priority radio buttons
      const priorityInput = _selectPriorityInput();

      // close create task interface after pressing the button to create the task
      _toggleCreateTaskInterfaceContainer();

      // if no title or no priority inputted then the "createTaskBtn" doesn't do anything
      if (!titleInput.value || !priorityInput) return;

      // generate task id
      let TASK_ID = uuidv4();

      let dueDate = _formatDueDate();

      DomModule.addTask(
        titleInput.value,
        dueDate,
        priorityInput.value,
        selectedProject.value,
        TASK_ID
      );
    });

    // Event Listener for creating projects
    createProjectBtn.addEventListener("click", function () {
      // close create project interface after pressing the button to create the project
      _toggleCreateProjectInterfaceContainer();

      DomModule.addProject(projectTitleInput.value);
    });

    // Toggle Create Task Interface appearance
    for (let i = 0; i < toggleTaskInterfaceBtn.length; i++) {
      // whenever task interface is opened or closed, reset fields
      toggleTaskInterfaceBtn[i].addEventListener("click", _resetTaskFields);

      toggleTaskInterfaceBtn[i].addEventListener(
        "click",
        _toggleCreateTaskInterfaceContainer
      );
    }

    // Toggle Create Project Interface appearance
    for (let i = 0; i < toggleProjectInterfaceBtn.length; i++) {
      // whenever project interface is opened or closed, reset fields
      toggleProjectInterfaceBtn[i].addEventListener(
        "click",
        _resetProjectFields
      );

      toggleProjectInterfaceBtn[i].addEventListener(
        "click",
        _toggleCreateProjectInterfaceContainer
      );
    }

    DomModule.initialization();
  }

    // adds visual depiction of selecting project
    function highlightProject(selectedProject) {
      // unselect all projects
      const projects = document.querySelectorAll(".project");
      projects.forEach((project) => project.classList.remove("selected-project"));
  
      if (!selectedProject.classList.contains("selected-project")) {
        // selects clicked on project
        selectedProject.classList.add("selected-project");
      }
    }

  return { initInterfaceBtns, highlightProject };
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
