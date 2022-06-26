import Interface from "./modules/Interface.js";
import MainStorage from "./modules/MainStorage.js";

// fontawesome
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

let tasksOnLS = JSON.parse(localStorage.getItem("tasks"));
let projectsOnLS = JSON.parse(localStorage.getItem("projects"));

if (tasksOnLS || projectsOnLS) {
  console.log("work?");
  tasksOnLS.forEach((task) => console.log(task));
  projectsOnLS.forEach((project) => console.log(project));
}

MainStorage.initializeLSUpdater();
Interface.initInterfaceBtns();
