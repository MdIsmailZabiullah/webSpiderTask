import express from "express"

import TaskModel from "../models/Task.model.js"
import CheakAuth from "../middlewares/Auth.js"

const TaskRouter = express.Router()


TaskRouter.post("/Task", async (req, res) => {
    try {
        const { title, desc, status, prty, date } = req.body;

        if (!title || !desc || !prty || !date) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newTask = new TaskModel({
            title: title,
            description: desc,
            status,
            priority: prty,
            dueDate: new Date(date),
        })


        await newTask.save()
            .then((taskdata) => {
                res.status(200).json(taskdata)
            })
            .catch((err) => {
                res.status(400).json(err)
            })

    } catch (error) {
        res.status(400).json(error)
    }

})
TaskRouter.get("/all", CheakAuth, async (req, res) => {
    try {
        const { property } = req.body

        const Allpost = await TaskModel.find({})
        if (!Allpost) {
            return res.status(200).json("No task Available !!")
        }
        if (property === "HIGH") {
            const HIGH = Allpost.filter((ele) => {
                if (ele.priority === "HIGH") {
                    return ele
                }
            })
            if (!HIGH) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(HIGH)
        } else if (property === "LOW") {
            const LOW = Allpost.filter((ele) => {
                if (ele.priority === "LOW") {
                    return ele
                }
            })
            if (!LOW) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(LOW)
        } else if (property === "MEDIUM") {
            const LOW = Allpost.filter((ele) => {
                if (ele.priority === "MEDIUM") {
                    return ele
                }
            })
            if (!MEDIUM) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(MEDIUM)
        } else if (property === "TODO") {
            const TODO = Allpost.filter((ele) => {
                if (ele.status === "TODO") {
                    return ele
                }
            })
            if (!TODO) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(TODO)
        } else if (property === "IN_PROGRESS") {
            const IN_PROGRESS = Allpost.filter((ele) => {
                if (ele.status === "IN_PROGRESS") {
                    return ele
                }
            })
            if (!IN_PROGRESS) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(IN_PROGRESS)
        } else if (property === "COMPLETED") {
            const COMPLETED = Allpost.filter((ele) => {
                if (ele.status === "COMPLETED") {
                    return ele
                }
            })
            if (!COMPLETED) {
                return res.status(200).json("No data found !!")
            }
            res.status(200).json(COMPLETED)
        } else if (property === "ALL") {
            res.status(200).json(Allpost)
        }


    } catch (error) {
        res.status(404).json(error)
    }
})

TaskRouter.get("/get/task/:id", async (req, res) => {
    try {
        const SearchTask = await TaskModel.find({ _id: req.params.id })
        if (!SearchTask) {
            return res.status(404).json("404 Error")
        }
        res.status(200).json(SearchTask)
    } catch (error) {
        res.status(400).json(error)
    }

})

TaskRouter.delete("/delete/task/:id", async (req, res) => {
    try {
        const deleteData = await TaskModel.findByIdAndDelete({ _id: req.params.id })
        if (!deleteData) {
            return res.status(404).json("404 Error")
        }
        res.status(200).json(deleteData)
    } catch (error) {
        res.status(400).json(error)
    }

})


TaskRouter.put("/update/task/:id", async (req, res) => {
    try {
        const { title, desc, status, prty, date } = req.body;

        if (!title || !status || !prty || !date) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update the task
        const updatedData = await TaskModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title,
                    description: desc,
                    status,
                    priority: prty,
                    dueDate: date,
                },
            },
            { new: true }
        );


        if (!updatedData) {
            return res.status(404).json({ error: "Task not found." });
        }


        res.status(200).json(updatedData);
    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the task." });
    }
});

export default TaskRouter