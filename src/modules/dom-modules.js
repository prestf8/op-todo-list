function addTaskToDom(task) {
  const div = document.createElement("div");
  const newContent = document.createTextNode(task.title);
  div.appendChild(newContent);
  document.body.appendChild(div);
}

export { addTaskToDom };
