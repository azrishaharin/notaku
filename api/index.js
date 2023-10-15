const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const cors = require("cors");
const keyFile = require("../api/key_file.js");

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(keyFile.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
        console.log(keyFile.mongoUrl);
    })

app.listen(port, () => {
    console.log("Server is running on port ", port);
})

const Task = require("../api/models/task.js");

//post request single task
app.post("/task", async (req, res) => {
    try {
    const {userId, title, description, completed} = req.body;
    const task = new Task({
        userId,
        title,
        description,
        completed,
    })
    // console.log(JSON.stringify(task));
    await task.save();
    return res.status(200).json({ message: "Task successfully created" });
} catch (error) {
    return res.status(500).json({ message: "Task failed to create, " + error });
}
})

//get request all tasks
app.get("/task", async (req, res) => {
    try{
        const userId = req.query.userId;
        const data = await Task.find({userId: userId});
        // console.log(JSON.stringify(data));
        return res.status(200).json(data);
        // const user = await Task.findOne({userId: req.query.userId});
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
    }catch(error){
        return res.status(500).json({ message: "Task failed to fetch, " + error });
    }
})

//update request single task
app.put("/task/:id", async (req, res) => {
    try {
        // console.log("Entered update task");
        const taskId = req.params.id;
        // console.log('taskID:' + JSON.stringify(taskId));
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
          }
        const {title, description, completed} = req.body;
        const task = await Task.findOne({_id: taskId});
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        // console.log("Task found");
        task.title = title;
        task.description = description;
        task.completed = completed;
        await task.save();
        // console.log("Task saved");
        return res.status(200).json({ message: "Task successfully updated" });
    } catch (error) {
        // console.log("Task failed to update", error);
        return res.status(500).json({ message: "Task failed to update, " + error });
    }
})
