import domModules from "./modules/dom-modules.js";
import "./stylesheets/styles.css";
import { v4 as uuidv4 } from "uuid";
import MainStorage from "./modules/mainStorage.js";

// https://zakarya-mks.github.io/ToDoers/

const createTaskBtn = document.getElementById("create-task-btn");
const titleInput = document.getElementById("title-input");
const dueDateInput = document.getElementById("due-date-input");

const priorityInputs = [...document.querySelectorAll('input[name="priority"]')];

// function initTaskBtn() {
//   const taskButtons = document.querySelectorAll("[data-task-button]");

//   taskButtons.forEach((taskBtn) =>
//     taskBtn.addEventListener("click", function () {
//       MainStorage.deleteTask();
//     })
//   );
// }

function selectPriorityInput() {
  const selectedPriorityInput = priorityInputs.filter((priorityInput) => {
    return priorityInput.checked;
  });
  if (!selectedPriorityInput[0]) return;
  return selectedPriorityInput[0];
}

createTaskBtn.addEventListener("click", function () {
  const priorityInput = selectPriorityInput();

  if (!titleInput.value || !priorityInput) return;
  let TASK_ID = uuidv4();

  domModules.addTask(
    titleInput.value,
    dueDateInput.value,
    priorityInput.value,
    TASK_ID
  );
});
