const express = require("express")
const db = require("../data/config")
const tasks = require("./task-model")

const router = express.Router()

//GET task
router.get("/", async (req, res, next) => {
    tasks
    .findTasks()
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch((err) => next(err))
    
})

//GET task by id
router.get("/:id", async (req, res, next) => {
    try {
        const task = await db("tasks").where("id", req.params.id).first()

        if (!task) {
            return res.status(404).json({
                message: "task by that ID not found for this project.",
            })
        }

        res.json(task)
    } catch (err) {
        next(err)
    }
})

//POST new task
router.post("/", async (req, res, next) => {
    try {
        await db("tasks").insert(req.body)
        res.status(201).json(req.body)
    } catch (err) {
        next(err)
    }
})

module.exports = router
