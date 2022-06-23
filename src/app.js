import Interface from "./modules/Interface.js";
import MainStorage from "./modules/MainStorage.js";

// fontawesome
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// if (localStorage.getItem("tasks")) {

//   const projects = JSON.parse(localStorage.getItem("projects"));
//   console.log(projects);
// }

const tasksOnLS = JSON.parse(localStorage.getItem("tasks"));
const projectsOnLS = JSON.parse(localStorage.getItem("projects"));

console.log("tasksOnLS", tasksOnLS);
console.log("projectsOnLS", projectsOnLS);

if (tasksOnLS) {
  tasksOnLS.forEach((task) => MainStorage.addTaskToStorage(task));
  projectsOnLS.forEach((project) => MainStorage.addProjectToStorage(project));
}

MainStorage.initializeLSUpdater();
Interface.initInterfaceBtns();
