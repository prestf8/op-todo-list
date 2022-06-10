function Task(title, dueDate, priority, id) {
  this._title = title;
  this._dueDate = dueDate;
  this._priority = priority;
  this._id = id;

  this.getTitle = function () {
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
}

export default Task;
