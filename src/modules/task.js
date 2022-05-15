function Task(title, dueDate, priority, id) {
  this.title = title;
  this.dueDate = dueDate;
  this.priority = priority;
  this.id = id;

  this.getId = function () {
    return this.id;
  };
}

export default Task;
