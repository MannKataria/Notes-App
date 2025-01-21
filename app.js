const main = document.querySelector(".container");
const addList = document.querySelector(".add-list");

var id = localStorage.getItem("id")
  ? JSON.parse(localStorage.getItem("id"))
  : 0;
var Lists = localStorage.getItem("lists")
  ? JSON.parse(localStorage.getItem("lists"))
  : [];

addList.addEventListener("click", () => {
  addNewList();
});

// Add a List
const addNewList = () => {
  const listId = id;
  const listName = prompt("Enter the name of your list :");
  if (listName == null) {
    return;
  } else if (listName == "") {
    alert("Please enter a valid List name !");
    return;
  }
  Lists.push({
    listId: listId,
    listName: listName,
    tasksId: 0,
    tasks: [],
  });
  id++;
  updateLists();
};

// Delete a List
const deleteList = (delId) => {
  const listIndex = Lists.findIndex((List) => List.listId === delId);
  Lists.splice(listIndex, 1);
  if (Lists.length === 0) id = 0;
  updateLists();
};

// Add a Task
const addNewTask = (addId) => {
  const task = prompt("Enter your task :");
  if (task == null) {
    return;
  } else if (task == "") {
    alert("Please enter a valid task !");
    return;
  }
  const listIndex = Lists.findIndex((List) => List.listId === addId);
  const tasksId = Lists[listIndex].tasksId;
  Lists[listIndex].tasks.push({
    taskId: tasksId,
    task: task,
  });
  Lists[listIndex].tasksId = tasksId + 1;
  updateLists();
};

// Edit a Task
const editTask = (editListId, editTaskId, prevText) => {
  const newTask = prompt("Edit your task :", prevText);
  if (newTask == null) {
    return;
  } else if (newTask == "") {
    alert("Please enter a valid task !");
    return;
  }
  const listIndex = Lists.findIndex((List) => List.listId === editListId);
  const taskIndex = Lists[listIndex].tasks.findIndex(
    (task) => task.taskId === editTaskId
  );
  Lists[listIndex].tasks[taskIndex].task = newTask;
  updateLists();
};

// Delete a Task
const deleteTask = (delListId, delTaskId) => {
  const listIndex = Lists.findIndex((List) => List.listId === delListId);
  const taskIndex = Lists[listIndex].tasks.findIndex(
    (task) => task.taskId === delTaskId
  );
  Lists[listIndex].tasks.splice(taskIndex, 1);
  if (Lists[listIndex].tasks.length === 0) Lists[listIndex].tasksId = 0;
  updateLists();
};

const updateLists = () => {
  localStorage.setItem("lists", JSON.stringify(Lists));
  localStorage.setItem("id", JSON.stringify(id));
  renderLists(Lists);
};

const renderLists = () => {
  main.innerHTML = "";
  Lists.map((List) => {
    const newList = document.createElement("div");
    newList.classList.add("list");

    const newContent = document.createElement("div");
    newContent.classList.add("list-content");
    newList.appendChild(newContent);

    // Adding list name
    const newName = document.createElement("div");
    newName.classList.add("list-name");
    newContent.appendChild(newName);
    newName.textContent = List.listName;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    newContent.appendChild(taskContainer);

    taskContainer.innerHTML = "";
    List.tasks.map((task) => {
      const newTask = document.createElement("div");
      newTask.classList.add("task");

      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");
      taskContent.textContent = task.task;
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
        editTask(List.listId, task.taskId, taskContent.textContent);
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
        deleteTask(List.listId, task.taskId);
        return;
      });

      taskContainer.appendChild(newTask);
    });

    // Adding list buttons
    const listBtns = document.createElement("div");
    listBtns.classList.add("list-btns");
    newList.appendChild(listBtns);

    const addTask = document.createElement("button");
    addTask.classList.add("btn", "add-task");
    addTask.textContent = "Add a task";
    listBtns.appendChild(addTask);
    addTask.addEventListener("click", () => {
      addNewTask(List.listId);
      return;
    });

    const delList = document.createElement("button");
    delList.classList.add("btn", "delete-list");
    delList.textContent = "Delete list";
    listBtns.appendChild(delList);
    delList.addEventListener("click", () => {
      deleteList(List.listId);
      return;
    });

    // Appending to the DOM
    main.appendChild(newList);
  });
};

// Render Lists on page reload
renderLists();
