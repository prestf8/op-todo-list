const MainStorage = (function () {
  "use strict";
  let _storage = [];
  let _projectStorage = [];

  function deleteProject(project) {
    // find index of where the project is so we can use this to remove from storage
    const index = _projectStorage.includes(project);

    _projectStorage.splice(index, 1);
    console.log("L:", _projectStorage);
  }

  function getStorage() {
    return _storage;
  }

  function getProjectStorage() {
    return _projectStorage;
  }

  function checkValidProject(name) {
    const tempNameStorage = _projectStorage.map((project) => project.getName());
    return !tempNameStorage.includes(name);
  }

  function addProjectToStorage(project) {
    _projectStorage.push(project);
  }

  function addTaskToStorage(task) {
    _storage.push(task);
  }

  function deleteTask(id) {
    let storage = MainStorage.getStorage();
    console.log("id: " + id);
    _storage = storage.filter((task) => {
      console.log("taskid: " + task.getId());
      return task.getId() !== id;
    });
    console.log(_storage);
  }

  return {
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
