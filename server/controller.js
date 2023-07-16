//create a database of tasks for the to-do list app:

const databaseTasks = [
  { taskId: 1, taskName: "eat breakfast, lunch, and dinner" },
  { taskId: 2, taskName: "light exercise for 20 min" },
  { taskId: 3, taskName: "shower & skincare" },
];

let taskId = 4;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "A lifetime of happiness lies ahead of you.",
      "Go take a rest; you deserve it.",
      "Everyday in your life is a special occasion.",
      "Your love life will be happy and harmonious.",
      "Your talents will be recognized and suitably rewarded.",
    ];

    //chose a random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
    res.status(200).send(randomFortune);
  },

  // getTasks() to display all the tasks by sending databaseTasks to client
  getTasks: (req, res) => {
    res.status(200).send(databaseTasks);
  },

  //createTask() to create a task, push to databaseTasks, display databaseTasks to client
  createTask: (req, res) => {
    const { taskName } = req.body;
    const taskObj = { taskId, taskName };
    databaseTasks.push(taskObj);
    res.status(200).send(databaseTasks);
    taskId++;
  },

  // editTask() to look up taskId, revise the task by reassigning newTask to the current task, save to databaseTasks, and display databaseTasks to client
  editTask: (req, res) => {
    const { id } = req.params;
    const {newTaskName} = req.query;
    const indexofTask = databaseTasks.findIndex((task) => task.taskId === +id);
    if (indexofTask === -1) {
      res.status(400).send("sorry, taskId is not found.");
      return;
    }
    databaseTasks[indexofTask].taskName = newTaskName;
    res.status(200).send(databaseTasks);
  },

  // deleteTask() to look up the taskId, delete from databaseTasks using splice() method, and display databaseTasks to client
  deleteTask: (req, res) => {
    const { id } = req.params;
    const indexofTask = databaseTasks.findIndex((task) => task.taskId === +id);
    if (indexofTask === -1) {
      res.status(400).send("sorry, taskId is not found.");
      return;
    }
    databaseTasks.splice(indexofTask, 1);
    res.status(200).send(databaseTasks);
  },
};

/*

Pseudocode & Brainstorming Ideas for a CRUD App
CRUD = Creat, Read, Update, Delete 

Features Design Notes: Create an editable daily to-do list that has some default tasks, but also allows the user to add, edit, or delete tasks.

MVP: daily to-do list with the following features:
- shows all the list of tasks and task ID when the user refreshes the page
- has a submit button to submit a new task 
- edit button to edit an item ====> one way is to reference the task Id and have the user 
"rewrite" the task
- for each task, add a delete button 

other stuff: 
- create an array or database of items with taskId, taskName - done
- create taskId, add 1 after every task because this will be a counter - done

functions:
getTasks() - done
createTask() - done
editTask() - done
deleteTask() - done

*/
