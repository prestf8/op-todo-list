const MainStorage = (function () {
  "use strict";
  let _storage = [];
  let _projectStorage = [];

  function getStorage() {
    return _storage;
  }

  function getProjectStorage() {
    return _projectStorage;
  }

  function checkValidProject(name) {
    return !_projectStorage.includes(name);
  }

  function addProjectToStorage(name) {
    _projectStorage.push(name);
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
    deleteTask,
    getProjectStorage,
    checkValidProject,
  };
})();

export default MainStorage;
