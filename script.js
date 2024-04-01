import { applyThemePreference, toggleDarkTheme } from "./scripts/darkTheme";
import {
  appContainer,
  clearAllCompletedButton,
  controlButtons,
  darkThemeSwitcher,
  taskInput,
  taskList,
} from "./scripts/elements";
import { addTask } from "./scripts/taskManager";
import initializingApp from "./scripts/initializingApp";
import {
  clearAllTasks,
  deleteTask,
  toggleTask,
} from "./scripts/toggle-DeleteTasks";
import { filterTasks } from "./scripts/filterTasks";
import { dragEnd, dragOver, dragStart } from "./scripts/drag&drop";

applyThemePreference(); // Apply theme as soon as possible
document.addEventListener("DOMContentLoaded", applyThemePreference);

//1- toggleDarkTheme
darkThemeSwitcher.addEventListener("click", toggleDarkTheme);

//3-Add Task

taskInput.addEventListener("keydown", (e) => {
  const target = e.key;
  if (target === "Enter") {
    addTask();
  } else {
    return;
  }
});

//toggle tasks
//set toggle event listener

let allowClick = true;
export const setToggleCompletedItems = function () {
  taskList.addEventListener("click", (e) => {
    if (!allowClick) return;
    allowClick = false;
    setTimeout(() => {
      allowClick = true;
    }, 300); // Only allow another click after 300ms

    // Use closest to find the .todo__checkbox-container up the tree from the event target
    const targetElement = e.target.closest(".todo__checkbox-container");

    if (targetElement) {
      // This ensures the click came from within a .todo__checkbox-container
      const taskItem = targetElement.closest(".todo__item");
      if (taskItem) {
        const taskItems = Array.from(taskList.querySelectorAll(".todo__item"));
        const taskIndex = taskItems.indexOf(taskItem);

        toggleTask(taskItem, taskIndex);
      }
    }
  });
};

//set delete event Listener
taskList.addEventListener("click", (e) => {
  // Checking if the clicked element or its parent has a class of .todo__delete
  if (e.target.matches(".todo__delete") || e.target.closest(".todo__delete")) {
    const taskItem = e.target.closest(".todo__item"); // Finding the task item associated with the delete button

    const taskDataset = taskItem.dataset.task; // Get the ID of the task
    const taskId = +taskDataset.split("-").pop(); //get the index
    taskItem.remove(); //remove the task from the dom
    deleteTask(taskId); // delete the task from local storage
  }
});

//clearCompletedTasks
clearAllCompletedButton.addEventListener("click", clearAllTasks);

//filter the tasks
controlButtons.addEventListener("click", function (e) {
  // Check if the clicked element is a button
  if (e.target.matches(".btn")) {
    const filter = e.target.getAttribute("data-filter");
    filterTasks(filter);
  }
});

//drag and drop functionality
//using Event Delegation
taskList.addEventListener("dragstart", (e) => dragStart(e));
taskList.addEventListener("dragover", (e) => dragOver(e));
taskList.addEventListener("dragenter", (e) => e.preventDefault());
taskList.addEventListener("dragend", dragEnd);
//3- keep tasks on screens
initializingApp();

/* TODO tasks 
1-[x] toggleDarktheme
2-[x] keep tasks on screen
3-[x] addTask 
4-[x] save and retrieve tasks from Local Storage
5-[x] Update task counter
6-[x] delete Task
7-[x] toggleCompletedtask -- toggle checkbox
8-[x] task drag and drop
9-[x] filter tasks -- filter All , filter completed checked tasks, filter active unchecked tasks
10-[x] clear All completed tasks


*/
