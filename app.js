/* jshint esversion: 6 */

let val;
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
const init = () => {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task Event
  form.addEventListener('submit', addTask);
  // Remove task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Events
  clearBtn.addEventListener('click', clearTask);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

// Add Task
const addTask = (e) => {
  if(taskInput.value === '') {
    alert("Add a task..!");
  }

  // Create li element
  const li = document.createElement('li');
  // Add Class to li
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content';
  // Add icon HTML
  link.innerHTML = `<i class='fa fa-remove'></i>`;
  // Append the link to li
  li.appendChild(link);
  // Append the li to taskList
  taskList.appendChild(li);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear the input
  taskInput.value = '';

  e.preventDefault();
};

const getTasks = () => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task) => {
      // Create li element
    const li = document.createElement('li');
    // Add Class to li
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    // Append the link to li
    li.appendChild(link);
    // Append the li to taskList
    taskList.appendChild(li);

  });
};

const storeTaskInLocalStorage = (task) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (e) => {
  if(e.target.parentElement.classList.contains('delete-item')) {
    
    if(confirm('Are You Sure..?')) {
      let el = e.target.parentElement.parentElement;
      el.remove();
      // Remove from LS
      removeTaskFromLocalStorage(el);
    }
  }
  e.preventDefault();
};

const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearTask = (e) => {
  // taskList.innerHTML = '';
  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
  e.preventDefault();
};

const clearTaskFromLocalStorage = () => {
  localStorage.clear();
};

const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};

init();

