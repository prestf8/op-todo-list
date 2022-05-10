const domModules = (function () {
  'use strict';

  function _createTask(title, dueDate, priority) {
    return new Task(title, dueDate, priority);
  }
  
  function addTaskToDom(title, dueDate, priority) {
    const task = _createTask(title, dueDate, priority);
    
  }

  return {
    addTaskToDom
  }

})();

export { addTaskToDom };
