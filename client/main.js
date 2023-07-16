//set baseUrl:
const baseUrl = `http://localhost:4000`;

//select elements from index.html
const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addTaskForm = document.querySelector("#add-task-form");
const newTask = document.querySelector("#newTask");
const updateTaskForm = document.querySelector("#edit-task-form");
const taskId = document.querySelector("#task-id");
const editTask = document.querySelector("#edit-task");

//display the tasks list automatically
const displayTasksSection = document.querySelector("#displayTasksListSection");

const errCallback = (err) => console.log(err);

//get compliment alert
const getCompliment = () => {
  axios.get(`${baseUrl}/api/compliment/`).then((res) => {
    const data = res.data;
    alert(data);
  });
};

//get fortune alert
const getFortune = () => {
  axios.get(`${baseUrl}/api/fortune/`).then((res) => {
    const data = res.data;
    alert(data);
  });
};

//function to display all tasks when you load the page or after an event
displayTasksList = (tasksList) => {
  displayTasksSection.innerHTML = ``;
  tasksList.map((task) => {
    const displaySectionDiv = document.createElement("div");
    displaySectionDiv.innerHTML = `
        <ul>
        <li> Task ID: ${task.taskId} </li>
            <li> Task: ${task.taskName} </li>
            <button onclick="deleteTask(${task.taskId})"> Delete </button>
        </ul>
        `;
    displayTasksSection.appendChild(displaySectionDiv);
  });
};

//get all tasks
const getTasks = () => {
  axios
    .get(`${baseUrl}/api/tasks`)
    .then((res) => {
        console.log(res.data);
      displayTasksList(res.data);
    })
    .catch(errCallback);
};

//delete a task & display all the current tasks again
const deleteTask = (taskId) => {
  axios
    .delete(`${baseUrl}/api/tasks/${taskId}`)
    .then((res) => displayTasksList(res.data))
    .catch(errCallback);
};

//add a new task to list
const addFormHandler = (event) => {
  event.preventDefault();
  const body = {
    taskName: newTask.value,
  };
  axios
    .post(`${baseUrl}/api/tasks`, body)
    .then((res) => displayTasksList(res.data))
    .catch(errCallback);
  newTask.value = ``;
};

const updateFormHandler = (event) => {
  event.preventDefault();
  // console.log(taskId.value, editTask.value);
  axios
    .put(`${baseUrl}/api/tasks/${taskId.value}?newTaskName=${editTask.value}`)
    .then((res) => displayTasksList(res.data))
    .catch(errCallback);
};

// event listeners
document.addEventListener("DOMContentLoaded", getTasks)
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
addTaskForm.addEventListener('submit', addFormHandler)
updateTaskForm.addEventListener('submit', updateFormHandler)

