const main = document.querySelector(".container");
const addList = document.querySelector(".add-list");
const demoList = document.querySelector(".demo-list");

newListCount = 0;
addList.addEventListener("click", () => {
  if (newListCount == 0) {
    main.removeChild(demoList);
    newListCount++;
  }
  createNewList();
});
function createNewList() {
  const listName = prompt("Enter the name of your list :");
  if (listName == null) {
    return;
  } else if (listName == "") {
    alert("Enter name of note");
    return;
  }
  // Creating new list
  const newList = document.createElement("div");
  newList.classList.add("list");
  main.appendChild(newList);

  const newContent = document.createElement("div");
  newContent.classList.add("list-content");
  newList.appendChild(newContent);

  // Adding list name
  const newName = document.createElement("div");
  newName.classList.add("list-name");
  newContent.appendChild(newName);
  newName.textContent = listName;

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  newContent.appendChild(taskContainer);

  // Adding list buttons
  const listBtns = document.createElement("div");
  listBtns.classList.add("list-btns");
  newList.appendChild(listBtns);

  const addTask = document.createElement("button");
  addTask.classList.add("btn", "add-task");
  addTask.textContent = "Add a task";
  listBtns.appendChild(addTask);
  addTask.addEventListener("click", () => {
    createNewTask(taskContainer);
    return;
  });

  const delList = document.createElement("button");
  delList.classList.add("btn", "delete-list");
  delList.textContent = "Delete list";
  listBtns.appendChild(delList);
  delList.addEventListener("click", () => {
    main.removeChild(newList);
    newListCount--;
    return;
  });
  newListCount++;
  return newList;
}

// Creatong New Task
function createNewTask(container) {
  const task = prompt("Enter your task :");
  if (task == null) {
    return;
  } else if (task == "") {
    alert("Please enter a task !");
    return;
  }

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  container.appendChild(newTask);

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  taskContent.textContent = task;
  newTask.appendChild(taskContent);

  // Adding task buttons
  const taskBtns = document.createElement("div");
  taskBtns.classList.add("task-btns");
  newTask.appendChild(taskBtns);

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "edit-btn");
  const editBtnSpan = document.createElement("span");
  editBtnSpan.classList.add("material-symbols-outlined");
  editBtnSpan.textContent = " edit ";
  editBtn.appendChild(editBtnSpan);
  taskBtns.appendChild(editBtn);
  editBtn.addEventListener("click", () => {
    const editTask = prompt("Edit your task :", taskContent.textContent);
    if (editTask == null) {
      return;
    } else if (editTask == "") {
      alert("Please enter a task !");
      return;
    }
    taskContent.textContent = editTask;
    return;
  });

  const delBtn = document.createElement("button");
  delBtn.classList.add("btn", "delete-btn");
  const delBtnSpan = document.createElement("span");
  delBtnSpan.classList.add("material-symbols-outlined");
  delBtnSpan.textContent = " delete ";
  delBtn.appendChild(delBtnSpan);
  taskBtns.appendChild(delBtn);
  delBtn.addEventListener("click", () => {
    container.removeChild(newTask);
    return;
  });
  return newTask;
}
