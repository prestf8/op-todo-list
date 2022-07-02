import MainStorage from "./MainStorage.js";
import Interface from "./Interface.js";

const DomModule = (function () {
  "use strict";

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

  // Setup the checkbox button that indicates whether a task has been completed or not
  function _setupTodoCompleteButton() {
    let todoCompleteBtn = document.createElement("input");
    todoCompleteBtn.setAttribute("type", "checkbox");

    todoCompleteBtn.addEventListener("click", function (e) {
      // get the label container of the corresponding task
      let correspondingTaskContent =
        this.parentElement.querySelector(".task-content");

      // selecting title/name label of task
      let taskNameLabel = correspondingTaskContent.children[0];

      // selecting due date label of task
      let dueDateLabel = correspondingTaskContent.children[1];

      // selecting delete button of task
      let deleteBtn = this.parentElement.querySelector(".task-delete-btn");

      // title/name label of task toggles strikethrough through it, and gray it out
      taskNameLabel.classList.toggle("task-completed-strikethrough");
      taskNameLabel.classList.toggle("task-completed-gray");

      // gray out title/name label, due date label, and delete button
      dueDateLabel.classList.toggle("task-completed-gray");

      // gray out delete button of task
      deleteBtn.classList.toggle("task-completed-gray");
    });
    return todoCompleteBtn;
  }

  // function that adds task to dom given a name, dueDate, priority value, and id
  function addTaskToDom(title, dueDate, priority, id) {
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

    // div container to group all the left elements
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("task-content");

    // create all the elements in the task
    const todoCompleteBtn = _setupTodoCompleteButton();
    const titleLabel = _setupLabel(title);
    titleLabel.style.marginLeft = "1rem"; // give space to the left of the title
    const dueDateLabel = _setupLabel(dueDate);
    const taskDeleteBtn = _createTaskDeleteBtn();

    // append all the created elements and the label container to the DOM
    leftDiv.appendChild(todoCompleteBtn);
    leftDiv.appendChild(titleLabel);
    leftDiv.appendChild(dueDateLabel);
    task.appendChild(leftDiv);
    task.appendChild(taskDeleteBtn);

    // name=id attribute for task;
    task.setAttribute(`name`, id);

    // add task to DOM (to "_taskContainer")
    _taskContainer.appendChild(task);
  }

  // function that adds project to dom using a name
  function addProjectToDom(title) {
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
    deleteBtn.classList.add("delete-btn");

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
    deleteTaskButton.className = "task-delete-btn delete-btn";
    deleteTaskButton.setAttribute("data-task-btn", true);

    deleteTaskButton.addEventListener("click", function () {
      // get label
      const taskContent = this.parentElement.children[1];
      const text = taskContent.querySelector(".label").textContent;

      // Regardless of the current project, any identical task in "Inbox" gets deleted as well
      MainStorage.deleteTask(text);

      // Check and delete identical tasks in other projects if you delete a task from "Inbox" project
      if (MainStorage.getCurrentProject() === "Inbox") {
        // identical tasks in other projects if same task is deleted from "Inbox"
        MainStorage.removeDuplicateTaskInCreatedProjects(text);
      } else {
        // this block runs when the current project is not "Inbox" and thus you are removing a task from these projects
        MainStorage.getProjectByCurrentProject().removeTaskByName(text);
      }

      // remove parent element (corresponding task)
      this.parentElement.remove();
    });

    return deleteTaskButton;
  }

  // OUTDATED: event listener that is called when you click on a task
  // function _checkTaskInteraction(e) {
  //   // this block is called if element clicked on is a task delete button
  //   console.log(e.target);

  //   // Delete button is made of up: delete btn, path, and svg
  //   // Because e.target is equal to whatever it clicks,
  //   // if it clicks the delete btn, path, and svg it should run this block
  //   if (
  //     e.target.classList.contains("task-delete-btn") ||
  //     e.target.tagName === "svg" ||
  //     e.target.tagName === "path"
  //   ) {
  //     // deleting task from storage
  //     const taskContent = e.target.parentElement.children[0];
  //     const text = taskContent.querySelector(".label").textContent;
  //     MainStorage.deleteTask(text);

  //     // Removes identical tasks in created projects if the same task is deleted from "Inbox"
  //     _removeDuplicateTaskInCreatedProjects(text);

  //     // remove parent element (corresponding task)
  //     e.target.parentElement.remove();

  //     console.log("storage: ", MainStorage.getStorage());
  //   }
  // }

  function _clearTaskDom() {
    _taskContainer.innerHTML = "";
  }

  function _reloadTaskDom() {
    _clearTaskDom();

    let currentProject = MainStorage.getCurrentProject();

    // h2 element that labels what is the current/selected Project
    _taskContainer.innerHTML += `<h2 id="task-container-project-title">${currentProject}</h2>`;

    const selectedProjectObject = MainStorage.getProjectByCurrentProject();
    // console.log(selectedProjectObject);

    let tasksInProject;
    // if currentProject becomes "Inbox" (Inbox doesn't exist in the project storage of MainStorage)
    if (!selectedProjectObject) {
      // MainStorage task storage is Inbox's task storage, so obtain its tasks from MainStorage
      tasksInProject = MainStorage.getStorage();
      // console.log("Inbox:", tasksInProject);
    } else {
      // else if current Project isn't inbox and thus exists in the project storage of MainStorage
      // THIS FUNCTION ISNT WRONG, BUT this._tasks inside of the project is empty
      tasksInProject = selectedProjectObject.getTasks();
      // console.log("Any other project:", tasksInProject);
    }

    // using the tasks in each storage, add to DOM
    for (let task of tasksInProject) {
      const title = task.getName();
      const id = task.getId();
      const dueDate = task.getDueDate();
      const priority = task.getPriority();
      addTaskToDom(title, dueDate, priority, id);
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
      Interface.highlightProject(this);

      // assign text of selected project to the "currentProject" variable
      // console.log(this.children);
      MainStorage.setCurrentProject(this.children[0].textContent);

      // this block runs if what is clicked on isn't the text or project, meaning what is clicked on is the delete button
    } else {
      // remove project from DOM
      this.remove();
      // pass in "corresponding" project to delete it from storage
      MainStorage.deleteProject(this);

      // reupdates project options for select
      _reupdateProjectSelect();

      // reset "currentProject" variable to the text of the inbox project
      MainStorage.setCurrentProject("Inbox");

      // the parameter of this function is the "Inbox" project because it is the first element with the "project" classname
      // meaning this automatically visually styles the selection of the "Inbox" project once any project is deleted
      Interface.highlightProject(document.querySelector(".project"));
    }

    _reloadTaskDom();
  }

  // public method to set interactivity of clicking task/project and different parts of them
  function initialization() {
    // "Inbox" project add interactivity to it by click (because "Inbox" isn't in the project storage where event listeners are assigned there)
    listOfProjects[0].addEventListener("click", _checkProjectInteraction);
  }

  return {
    addProjectToDom,
    addTaskToDom,
    initialization,
  };
})();

export default DomModule;
