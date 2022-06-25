function Task(title, dueDate, priority, project, id) {
  this._title = title;
  this._dueDate = dueDate;
  this._priority = priority;
  this._project = project;
  this._id = id;

  this.getName = function () {
    return this._title;
  };

  this.getId = function () {
    return this._id;
  };

  this.getDueDate = function () {
    return this._dueDate;
  };

  this.getPriority = function () {
    return this._priority;
  };

  this.getProject = function () {
    return this._project;
  };
}

// Task.prototype.getName = function () {
//   return this._title;
// };

// Task.prototype.getId = function () {
//   return this._id;
// };

// Task.prototype.getDueDate = function () {
//   return this._dueDate;
// };

// Task.prototype.getPriority = function () {
//   return this._priority;
// };

// Task.prototype.getProject = function () {
//   return this._project;
// };

export default Task;
