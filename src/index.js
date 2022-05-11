import domModules from "./modules/dom-modules.js";
import "./stylesheets/styles.css";

const createTaskBtn = document.getElementById("create-task-btn");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

const priorityInputs = document.querySelectorAll(
  "create-task-interface-priority-div > input[type=text]"
);

createTaskBtn.addEventListener("click", function () {
  domModules.addTaskToDom(
    titleInput.value,
    dueDateInput.value,
    priorityInputs.value
  );
});
