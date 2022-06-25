import DomModule from "./DomModule.js";
import MainStorage from "./MainStorage.js";
import Task from "./Task.js";
import Project from "./Project.js";
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

      addTask(
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

      addProject(projectTitleInput.value);
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

  // public method that creates task and adds it to the dom and storage
  function addTask(title, dueDate, priority, projectName, id) {
    // checks if there already is a task in "Inbox", if there is then don't create a task
    // // Among all the projects including "Inbox" can there be no task with the same name
    if (MainStorage.checkDuplicateTask(title)) {
      return;
    }

    // create new task object
    const task = new Task(title, dueDate, priority, projectName, id);

    const projects = MainStorage.getProjectStorage(); // projects

    // if project isn't "Inbox"
    if (projects.some((project) => project.getName() === projectName)) {
      // get index of where project lies in the project storage of MainStorage
      const indexOfProject = projects
        .map((project) => project.getName())
        .indexOf(projectName);

      // ADD TO THE STORAGE OF THE CORRESPONDING TASK
      projects[indexOfProject].addTask(task);
    }

    // BOTH scenarios add task to storage of Inbox
    MainStorage.addTaskToStorage(task);

    // IF CURRENTPROJECT is the same project as the one you're adding your task to, then add it to the DOM
    // Exception: "Inbox" project contains all tasks, therefore add it to the DOM if the CURRENTPROJECT is "Inbox"
    if (
      MainStorage.getCurrentProject() === projectName ||
      MainStorage.getCurrentProject() === "Inbox"
    ) {
      // add task to dom
      DomModule.addTaskToDom(title, dueDate, priority, id);
    }
  }

  // // update: if same task exists in another project and exists in "Inbox", if that task is deleted from "Inbox" the
  //     // identical task in the other project gets deleted as well
  //     if (MainStorage.checkProjectByName(currentProject)) {
  //       console.log(
  //     }

  // public method that creates project and adds it to the dom and storage
  function addProject(title) {
    // if statement that runs only if no other project exists with this title

    if (MainStorage.checkValidProject(title)) {
      // create new project
      const newProject = new Project(title);
      // add project to storage by passing in project itself
      MainStorage.addProjectToStorage(newProject);
      // add project to dom using only title
      DomModule.addProjectToDom(title);
    }
  }

  return {
    initInterfaceBtns,
    highlightProject,
  };
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
