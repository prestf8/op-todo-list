import domModules from "./modules/dom-modules.js";
import "./stylesheets/styles.css";

const createTaskBtn = document.getElementById("create-task-btn");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

// not used yet
const priorityInputs = document.querySelectorAll(
  "create-task-interface-priority-div > input[type=text]"
);

const selectedPriorityInput = document.querySelectorAll(
  'input[name="priority"]'
);

createTaskBtn.addEventListener("click", function () {
  if (!selectedPriorityInput) {
    console.log("g");
    return;
  }
  console.log(selectedPriorityInput);

  domModules.addTaskToDom(
    titleInput.value,
    dueDateInput.value,
    selectedPriorityInput.value
  );
});
