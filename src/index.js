import Task from "./modules/task.js";
import { addTaskToDom } from "./modules/dom-modules.js";
import "./stylesheets/styles.css";

const addProjectBtn = document.getElementById("add-project-btn");

addProjectBtn.addEventListener("click", function () {
  addTaskToDom(new Task("Run", "5/1/2022", "High"));
});
