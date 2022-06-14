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

  this.removeTaskByName = function(name) {
    this._tasks = this._tasks.filter((task) => task.getName() !== name);
  }
}

export default Project;
