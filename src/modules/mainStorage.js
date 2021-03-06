import Project from "./Project.js";

const MainStorage = (function () {
  "use strict";
  let _storage = [];
  let _projectStorage = [];
  let _currentProject = "Inbox";

  // commented out because supposed to be no "Inbox" project in project Storage
  // function initialize() {
  //   _projectStorage.push(new Project("Inbox"));
  // }

  // writes to the local storage where property is assigned to all "Inbox" tasks
  function _writeToLSTasks() {
    // storing tasks as literary objects into localStorage
    let literaryObjTasks = [];

    for (let task of getStorage()) {
      literaryObjTasks.push({
        name: task.getName(),
        dueDate: task.getDueDate(),
        priority: task.getPriority(),
        project: task.getProject(),
        id: task.getId(),
      });
    }
    localStorage.setItem("tasks", JSON.stringify(literaryObjTasks));
  }

  // writes to the local storage where property is assigned to all projects
  function _writeToLSProjects() {
    // storing projects as literary objects into localStorage
    let literaryObjProjects = [];

    for (let project of getProjectStorage()) {
      literaryObjProjects.push({
        name: project.getName(),
      });
    }
    localStorage.setItem("projects", JSON.stringify(literaryObjProjects));
  }

  // this is run when the app starts; this updates the local Storage of tasks and projects right when the user is
  // about to exit the app or reload the app
  function initializeLSUpdater() {
    window.addEventListener("beforeunload", function () {
      _writeToLSTasks();
      _writeToLSProjects();
    });
  }

  function getCurrentProject() {
    return _currentProject;
  }

  function setCurrentProject(newProject) {
    _currentProject = newProject;
  }

  function getProjectByCurrentProject() {
    return _projectStorage.filter(
      (project) => project.getName() === _currentProject
    )[0];
  }

  function checkProjectByCurrentProject() {
    return _projectStorage.some(
      (project) => project.getName() === _currentProject
    );
  }

  function getProjectByName(name) {
    return _projectStorage.filter((project) => project.getName() === name)[0];
  }

  function checkProjectByName(name) {
    return _projectStorage.some(
      (project) => project.getName() === name
    );  }

  // both of these below return both storages
  function getStorage() {
    return _storage;
  }

  function getProjectStorage() {
    return _projectStorage;
  }

  // adds task to storage
  function addTaskToStorage(task) {
    _storage.push(task);
    // console.log("_storage: ", _storage);
  }

  // adds project to project storage
  function addProjectToStorage(project) {
    _projectStorage.push(project);
    // console.log("_projects: ", _projectStorage);
  }

  // removes task from "_storage" through id
  function deleteTask(name) {
    // obtain storage
    let storage = MainStorage.getStorage();

    // using filter we set a new array to "_storage" in which the new array
    // consists of elements that don't have an id equal to the id passed
    _storage = storage.filter((task) => {
      return task.getName() !== name;
    });
  }

  // removes project from "_projectStorage"
  function deleteProject(project) {
    // The parameter is a DOM element, we need to convert it to a project
    const projectName = project.children[0].textContent;
    const convertedProject = getProjectByCurrentProject(projectName);

    // locate where it is in array (the index can't be -1 so no need to check)
    const index = _projectStorage.indexOf(convertedProject);

    // console.log("projectStorage:", _projectStorage);
    // console.log("project", project);

    // console.log("index:", index);

    // use location to remove it from array
    _projectStorage.splice(index, 1);
  }

  // checks if there is already a project with the same name in "_projectStorage"
  function checkValidProject(name) {
    const tempNameStorage = _projectStorage.map((project) => project.getName());
    return !tempNameStorage.includes(name);

    // const tempNameStorage = JSON.parse(localStorage.getItem("projects"));
    // let listOfProjectNames = Object.keys(tempNameStorage);
    // console.log(listOfProjectNames);
  }

  // checks "Inbox" storage to see if the task exists there already; even among projects can't there be tasks with the same names
  function checkDuplicateTask(name) {
    // const tempNameStorage = _storage.map((task) => task.getName());
    // const tempNameStorage = _storage.forEach((task) =>
    //   console.log("indiv task: ", task)
    // ); // fake delete this later
    // return tempNameStorage.includes(name);
  }

  // Removes identical tasks in created projects if the same task is deleted from "Inbox"; passes in name of task
  function removeDuplicateTaskInCreatedProjects(name) {
    for (let project of MainStorage.getProjectStorage()) {
      let correspondingTasks = project.getTasks();

      // if task with same name as one deleted in "Inbox" exists in any other project's storage
      if (
        correspondingTasks.some((task) => task.getName() === name) &&
        _currentProject === "Inbox"
      ) {
        // remove the task from the corresponding project's storage
        project.removeTaskByName(name);
      }
    }
  }

  return {
    initializeLSUpdater,
    getCurrentProject,
    setCurrentProject,
    removeDuplicateTaskInCreatedProjects,
    checkDuplicateTask,
    checkProjectByName,
    getProjectByName,
    checkProjectByCurrentProject,
    getProjectByCurrentProject,
    getStorage,
    addTaskToStorage,
    addProjectToStorage,
    deleteProject,
    deleteTask,
    getProjectStorage,
    checkValidProject,
  };
})();

export default MainStorage;
