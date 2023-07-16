// this imports all the npm packages after I install them using: npm i express cors
const express = require("express");
const cors = require("cors");

//invoke express package, this returns an object with many methods that we can use with express
const app = express();

//middlewares
app.use(cors()); //invoke cors as middleware
app.use(express.json()); //this allows access to any request with a body object

//this calls the handler functions from the controller.js file
const {
  getCompliment,
  getFortune,
  getTasks,
  createTask,
  editTask,
  deleteTask,
} = require("./controller");


//create endpoints

app.get("/api/compliment", getCompliment); // feature 0: get a compliment
app.get("/api/fortune", getFortune); // feature 1: get a fortune

// TO-DO LIST App feature:
app.get("/api/tasks", getTasks)
app.post("/api/tasks", createTask)
app.put("/api/tasks/:id", editTask)
app.delete("/api/tasks/:id", deleteTask)


app.listen(4000, () => console.log("Server running on 4000"));
