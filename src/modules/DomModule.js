import Task from "./Task.js";
import MainStorage from "./MainStorage.js";
import Project from "./Project.js";

const DomModule = (function () {
  "use strict";

  // store the current project (select other projects to change this variable)
  let currentProject = "Inbox";

  // Container that lists all tasks
  const _taskContainer = document.getElementById("task-container");

  // // Container that lists all projects
  const _projectContainer = document.querySelector(".bottom-sidebar-section");

  const listOfProjects = document.querySelectorAll(".project");

  // reference this so we can insert projects before this to the DOM using "insertBefore"
  const createProjectBtn = document.querySelector(
    ".toggle-project-interface-btn"
  );

  // Create and setup label
  function _setupLabel(text) {
    const label = document.createElement("li");
    const textNode = document.createTextNode(text);
    label.appendChild(textNode);

    // every label (whether it belongs to a project or a task) gets a class of "label"
    label.className = "label";
    return label;
  }

  // function that adds task to dom given a name, dueDate, priority value, and id
  function _addTaskToDom(title, dueDate, priority, id) {
    const task = document.createElement("div"); // div element that is going to be appended to DOM

    // assign classes to task based on priority input; the css then styles the bar that indicates priority of task
    if (priority === "low") {
      task.classList.add("lowPriority");
    } else if (priority === "middle") {
      task.classList.add("middlePriority");
    } else if (priority === "high") {
      task.classList.add("highPriority");
    }

    // every task gets a class of "task"
    task.classList.add("task");

    // div container to group all the labels
    const labelDiv = document.createElement("div");
    labelDiv.classList.add("task-content");

    // create all the elements in the task
    const titleLabel = _setupLabel(title);
    const dueDateLabel = _setupLabel(dueDate);
    const taskDeleteBtn = _createTaskDeleteBtn();

    // append all the created elements and the label container to the DOM
    labelDiv.appendChild(titleLabel);
    labelDiv.appendChild(dueDateLabel);
    task.appendChild(labelDiv);
    task.appendChild(taskDeleteBtn);

    // name=id attribute for task;
    task.setAttribute(`name`, id);

    // add task to DOM (to "_taskContainer")
    _taskContainer.appendChild(task);
  }

  // function that adds project to dom using a name
  function _addProjectToDom(title) {
    // create project div
    const project = document.createElement("div");

    // every project has a class of "project"
    project.classList.add("project");

    // project name
    const nameLabel = _setupLabel(title);
    project.appendChild(nameLabel);

    // delete button for project
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.classList.add("p-delete-btn");

    project.appendChild(deleteBtn);

    // add interactivity and call callback whenever clicking on a project
    project.addEventListener("click", _checkProjectInteraction);

    // add project to DOM (to "_projectContainer") before the createProjectBtn
    _projectContainer.insertBefore(project, createProjectBtn);

    _reupdateProjectSelect();
  }

  // update project select everytime projects are updated
  function _reupdateProjectSelect() {
    // loop through storage and assign to select
    const projectSelect = document.getElementById("project-select");

    // reset html inside of <select> tag
    projectSelect.innerHTML = "";

    // there is no "Inbox" project in MainStorage's project Storage, therefore we should manually add an option for Inbox
    projectSelect.innerHTML += '<option value="inbox">Inbox</option>';

    // add projects to select based on projects stored
    for (let project of MainStorage.getProjectStorage()) {
      const name = project.getName();
      const optionValue = project.getName();
      projectSelect.innerHTML += `<option value=${optionValue}>${name}</option>`;
    }
  }

  // create delete task button for tasks
  function _createTaskDeleteBtn() {
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteTaskButton.className = "task-delete-btn";
    deleteTaskButton.setAttribute("data-task-btn", true);
    return deleteTaskButton;
  }

  // Removes identical tasks in created projects if the same task is deleted from "Inbox"; passes in name of task
  function _removeDuplicateTaskInCreatedProjects(name) {
    for (let project of MainStorage.getProjectStorage()) {
      let correspondingTasks = project.getTasks();

      // if task with same name as one deleted in "Inbox" exists in any other project's storage
      if (
        correspondingTasks.some((task) => task.getName() === name) &&
        currentProject === "Inbox"
      ) {
        // remove the task from the corresponding project's storage
        project.removeTaskByName(name);
      }
    }
  }

  // event listener that is called when you click on a task
  function _checkTaskInteraction(e) {
    // this block is called if element clicked on is a task delete button
    if (e.target.classList.contains("task-delete-btn")) {
      // deleting task from storage
      const taskContent = e.target.parentElement.children[0];
      const text = taskContent.querySelector(".label").textContent;
      MainStorage.deleteTask(text);

      // Removes identical tasks in created projects if the same task is deleted from "Inbox"
      _removeDuplicateTaskInCreatedProjects(text);

      // remove parent element (corresponding task)
      e.target.parentElement.remove();

      console.log("storage: ", MainStorage.getStorage());
    }
  }

  // adds visual depiction of selecting project
  function _highlightProject(selectedProject) {
    // unselect all projects
    const projects = document.querySelectorAll(".project");
    projects.forEach((project) => project.classList.remove("selected-project"));

    if (!selectedProject.classList.contains("selected-project")) {
      // selects clicked on project
      selectedProject.classList.add("selected-project");
    }
  }

  function _clearTaskDom() {
    _taskContainer.innerHTML = "";
  }

  function _reloadTaskDom() {
    _clearTaskDom();

    // h2 element that labels what is the current/selected Project
    _taskContainer.innerHTML += `<h2>${currentProject}</h2>`;

    const selectedProjectObject = MainStorage.getProjectByName(currentProject);
    // console.log(selectedProjectObject);

    let tasksInProject;
    // if currentProject becomes "Inbox" (Inbox doesn't exist in the project storage of MainStorage)
    if (!selectedProjectObject) {
      // MainStorage task storage is Inbox's task storage, so obtain its tasks from MainStorage
      tasksInProject = MainStorage.getStorage();
      // console.log(tasksInProject);
    } else {
      // else if current Project isn't inbox and thus exists in the project storage of MainStorage
      // THIS FUNCTION ISNT WRONG, BUT this._tasks inside of the project is empty
      tasksInProject = selectedProjectObject.getTasks();
      console.log(tasksInProject);
    }

    // using the tasks in each storage, add to DOM
    for (let task of tasksInProject) {
      const title = task.getName();
      const id = task.getId();
      const dueDate = task.getDueDate();
      const priority = task.getPriority();
      _addTaskToDom(title, dueDate, priority, id);
    }
  }

  // callback function that is called when you click on any part of the element
  function _checkProjectInteraction(e) {
    // if what is clicked on is the text or the project itself then "highlight" the project
    if (
      e.target.classList.contains("label") ||
      e.target.classList.contains("project")
    ) {
      // pass in project name which will update visual selections of projects
      _highlightProject(this);

      // assign text of selected project to the "currentProject" variable
      currentProject = this.children[0].textContent;

      // this block runs if what is clicked on isn't the text or project, meaning what is clicked on is the delete button
    } else {
      // remove project from DOM
      this.remove();
      // pass in "corresponding" project to delete it from storage
      MainStorage.deleteProject(this);

      // reupdates project options for select
      _reupdateProjectSelect();

      // reset "currentProject" variable to the text of the inbox project
      currentProject = "Inbox";

      // the parameter of this function is the "Inbox" project because it is the first element with the "project" classname
      // meaning this automatically visually styles the selection of the "Inbox" project once any project is deleted
      _highlightProject(document.querySelector(".project"));
    }

    _reloadTaskDom();
  }

  // public method to set interactivity of clicking task/project and different parts of them
  function initialization() {
    // All tasks add interactivity to them by click
    _taskContainer.addEventListener("click", _checkTaskInteraction);

    // "Inbox" project add interactivity to it by click
    listOfProjects[0].addEventListener("click", _checkProjectInteraction);
  }

  // public method that creates task and adds it to the dom and storage
  function addTask(title, dueDate, priority, projectName, id) {
    // checks if there already is a task in "Inbox", if there is then don't create a task
    // Among all the projects including "Inbox" can there be no task with the same name
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
    if (currentProject === projectName || currentProject === "Inbox") {
      // add task to dom
      _addTaskToDom(title, dueDate, priority, id);
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
      _addProjectToDom(title);
    }
  }

  return {
    initialization,
    addTask,
    addProject,
  };
})();

export default DomModule;
