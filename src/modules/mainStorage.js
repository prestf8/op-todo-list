const MainStorage = (function () {
  "use strict";
  let _storage = [];

  function getStorage() {
    return _storage;
  }

  function addTaskToStorage(task) {
    _storage.push(task);
  }

  function deleteTask(id) {
    let storage = MainStorage.getStorage();
    console.log("id: " + id);
    _storage = _storage.filter((task) => {
      console.log("taskid: " + task.getId());
      return task.getId() !== id;
    });
    console.log(_storage);
  }

  return { getStorage, addTaskToStorage, deleteTask };
})();

export default MainStorage;
