import domModules from "./modules/dom-modules.js";
import "./stylesheets/styles.css";
import { v4 as uuidv4 } from "uuid";

// https://zakarya-mks.github.io/ToDoers/

const createTaskBtn = document.getElementById("create-task-btn");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

const priorityInputs = [...document.querySelectorAll('input[name="priority"]')];

function selectPriorityInput() {
  const selectedPriorityInput = priorityInputs.filter((priorityInput) => {
    return priorityInput.checked;
  });
  if (!selectedPriorityInput) return;
  console.log(selectedPriorityInput);
  return selectedPriorityInput;
}

createTaskBtn.addEventListener("click", function () {
  if (!titleInput.value) return;
  const TASK_ID = uuidv4();
  const priorityInput = selectPriorityInput()[0];

  domModules.addTask(
    titleInput.value,
    dueDateInput.value,
    priorityInput.value,
    TASK_ID
  );
});
