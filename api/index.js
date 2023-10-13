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
    console.log(JSON.stringify(task));
    await task.save();
    return res.status(200).json({ message: "Task successfully created" });
} catch (error) {
    return res.status(500).json({ message: "Task failed to create, " + error });
}
})
