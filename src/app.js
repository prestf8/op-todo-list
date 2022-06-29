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

// Obtaining tasks and projects from local storage (if any)
let tasksOnLS = JSON.parse(localStorage.getItem("tasks"));
let projectsOnLS = JSON.parse(localStorage.getItem("projects"));

// Check if there are tasks or projects in local storage and run this block if so
if (tasksOnLS || projectsOnLS) {
  // Loop through projects from local storage (projects from local storage are literal objects)
  projectsOnLS.forEach((literaryProjectObj) => {
    const nameOfProject = literaryProjectObj.name;

    const project = new Project(nameOfProject); // Create "Project" object from name
    MainStorage.addProjectToStorage(project); // add "Project" object to storage
    DomModule.addProjectToDom(nameOfProject); // add project to DOM using name
  });

  // Loop through tasks from local storage (tasks from local storage are also stored as literal objects)
  tasksOnLS.forEach((literaryTaskObj) => {
    // Using the corresponding literary task object, create a "Task" object
    const task = new Task(
      literaryTaskObj.name,
      literaryTaskObj.dueDate,
      literaryTaskObj.priority,
      literaryTaskObj.project,
      literaryTaskObj.id
    );

    // Store "Task" object into main storage "Inbox" 
    MainStorage.addTaskToStorage(task);

    // This block runs if the task's corresponding project exists in the project storage ("Inbox" project isn't in project storage)
    if (MainStorage.checkProjectByName(literaryTaskObj.project)) {
      // Obtain corresponding "Project" object of "Task" object
      let project = MainStorage.getProjectByName(literaryTaskObj.project);

      // read "Task" object into its corresponding "Project" object
      project.addTask(task);
    }

    // User's current project is by default "Inbox" when starting the app; Updates "Inbox" DOM
    DomModule.addTaskToDom(
      literaryTaskObj.name,
      literaryTaskObj.dueDate,
      literaryTaskObj.priority,
      literaryTaskObj.id
    );
  });


}

// Set event listener that updates "tasks" and "projects" keys of local storage when user exits/reloads app
MainStorage.initializeLSUpdater();

// app initialization
Interface.initInterfaceBtns();
