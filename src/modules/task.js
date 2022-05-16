function Task(title, dueDate, priority, id) {
  this._title = title;
  this._dueDate = dueDate;
  this._priority = priority;
  this._id = id;

  this.getId = function () {
    return this._id;
  };
}

export default Task;
