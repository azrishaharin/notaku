const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;