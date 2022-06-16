# ISSUES

DONE: When you delete a task from inbox, if the same task
exists in another project it doesn't delete it

DONE: When you delete a task from a project that isn't from inbox, if the same task
exists in "Inbox" delete it

DONE: project "select" html is listing the wrong projects
(after deleting projects)

DONE: "Inbox" can add tasks of the same name if you add a task with the same name as the task in "Inbox" to another project (solution: make it so that it checks MainStorage for duplicate names)

DONE: can't click on the middle of task delete buttons (bubbling issue again)

- When any project has identical tasks to "Inbox", and you delete tasks from that particular project, and navigate to
  "Inbox" and back, it refills with the tasks that were deleted before

# ADDITIONS

- Improve UI appearance
- When adding a task with the same name, put an warning that you can't do that
- set task to completed
- "Enter" and "Escape" keys for creating tasks/projects
- localStorage
