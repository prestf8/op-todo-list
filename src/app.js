import Interface from "./modules/Interface.js";
import MainStorage from "./modules/MainStorage.js";
import DomModule from "./modules/DomModule.js";

// fontawesome
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import Project from "./modules/Project.js";
import Task from "./modules/Task.js";

let tasksOnLS = JSON.parse(localStorage.getItem("tasks"));
let projectsOnLS = JSON.parse(localStorage.getItem("projects"));

MainStorage.initializeLSUpdater();
Interface.initInterfaceBtns();

if (tasksOnLS || projectsOnLS) {
  // 2. Using these literary objects which are like data, create objects
  // using the "Task" and "Project" constructors and store them in _storage and
  // _projectStorage
  // Note: Create "Project" objects first because when we create the "Task" objects we need to assign each
  // task into its corresponding project
  // 3. addProjectToDom(title) and addTaskToDom(title, dueDate, priority, id)

  projectsOnLS.forEach((literaryProjectObj) => {
    const nameOfProject = literaryProjectObj.name;
    const project = new Project(nameOfProject); // literary project object
    MainStorage.addProjectToStorage(project); // add "Project" object to storage
    DomModule.addProjectToDom(nameOfProject);
  });

  tasksOnLS.forEach((literaryTaskObj) => {
    const task = new Task(
      literaryTaskObj.name,
      literaryTaskObj.dueDate,
      literaryTaskObj.priority,
      literaryTaskObj.project,
      literaryTaskObj.id
    );
    MainStorage.addTaskToStorage(task);

    // readd task to "Inbox" DOM
    DomModule.addTaskToDom(
      literaryTaskObj.name,
      literaryTaskObj.dueDate,
      literaryTaskObj.priority,
      literaryTaskObj.id
    );
  });

  console.log(MainStorage.getProjectStorage());
  // tasksOnLS.forEach((task) => console.log(task));
}
