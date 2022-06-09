import Project from "./Project.js";

const MainStorage = (function () {
  "use strict";
  let _storage = [];
  let _projectStorage = [];

  function initialize() {
    _projectStorage.push(new Project("Inbox"));
    console.log(_projectStorage);
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
  function deleteTask(id) {
    // obtain storage
    let storage = MainStorage.getStorage();

    // using filter we set a new array to "_storage" in which the new array
    // consists of elements that don't have an id equal to the id passed
    _storage = storage.filter((task) => {
      return task.getId() !== id;
    });
  }

  // removes project from "_projectStorage"
  function deleteProject(project) {
    // locate where it is in array
    const index = _projectStorage.includes(project);

    // use location to remove it from array
    _projectStorage.splice(index, 1);
  }

  // checks if there is already a project with the same name in "_projectStorage"
  function checkValidProject(name) {
    const tempNameStorage = _projectStorage.map((project) => project.getName());
    return !tempNameStorage.includes(name);
  }

  return {
    initialize,
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
