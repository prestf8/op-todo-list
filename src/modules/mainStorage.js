const MainStorage = (function () {
  "use strict";
  let _storage = [];

  function getStorage() {
    return _storage;
  }

  function addTaskToStorage(task) {
    _storage.push(task);
  }

  return { getStorage, addTaskToStorage };
})();

export default MainStorage;
