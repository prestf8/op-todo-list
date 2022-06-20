import Interface from "./modules/Interface.js";
import mainStorage from "./modules/MainStorage.js";

// fontawesome
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import MainStorage from "./modules/MainStorage.js";

if (localStorage.getItem("tasks")) {
  MainStorage.initializeLSUpdater();

  const projects = JSON.parse(localStorage.getItem("projects"));
  console.log(projects);
}

Interface.initInterfaceBtns();
