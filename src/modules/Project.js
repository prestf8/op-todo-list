function Project(name) {
  this._name = name;
  this._tasks = [];

  this.getName = function () {
    return this._name;
  };

  this.getTasks = function () {
    return this._tasks;
  };
}

export default Project;
