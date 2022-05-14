import domModules from "./modules/dom-modules.js";
import "./stylesheets/styles.css";

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
  const priorityInput = selectPriorityInput();

  domModules.addTaskToDom(
    titleInput.value,
    dueDateInput.value,
    priorityInput[0].value
  );
});
