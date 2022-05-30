function Project(name) {
  this._name = name;
  this._tasks = [];

  this.getName = function () {
    return this._name;
  };
}

export default Project;
