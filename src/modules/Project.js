function Project(name) {
  this._name = name;
  this._tasks = [];

  this.getName = function () {
    return this._name;
  };

  this.getTasks = function () {
    return this._tasks;
  };

  this.addTask = function (task) {
    this._tasks.push(task);
  };
}

export default Project;
