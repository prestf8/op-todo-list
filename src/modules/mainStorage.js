import Project from "./Project.js";

const MainStorage = (function () {
  "use strict";
  let _storage = [];
  let _projectStorage = [];

  // commented out because supposed to be no "Inbox" project in project Storage
  // function initialize() {
  //   _projectStorage.push(new Project("Inbox"));
  // }

  function getProjectByName(currentProject) {
    return _projectStorage.filter(
      (project) => project.getName() === currentProject
    )[0];
  }

  function checkProjectByName(currentProject) {
    return _projectStorage.some(
      (project) => project.getName() === currentProject
    );
  }

  // both of these below return both storages
  function getStorage() {
    return _storage;
  }

  function getProjectStorage() {
    return _projectStorage;
  }

  // both of these below add either a task or project to the storages
  function addTaskToStorage(task) {
    _storage.push(task);
  }

  function addProjectToStorage(project) {
    _projectStorage.push(project);
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
    const convertedProject = getProjectByName(projectName);

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
  }

  // checks "Inbox" storage to see if the task exists there already; even among projects can't there be tasks with the same names
  function checkDuplicateTask(name) {
    const tempNameStorage = _storage.map((task) => task.getName());
    return tempNameStorage.includes(name);
  }

  return {
    checkDuplicateTask,
    checkProjectByName,
    getProjectByName,
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
