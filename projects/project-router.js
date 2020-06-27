const express = require("express")
const db = require("../data/config")
const router = express.Router()

//GET all projects
router.get("/", async (req, res, next) => {
    try {
        res.json(await db("projects"))
    } catch (err) {
        next(err)
    }
})

//GET project by id
router.get("/:id", async (req, res, next) => {
    try {
        const project = await db("projects").where("id", req.params.id).first()

        if (!project) {
            return res.status(404).json({
                message: "project with that ID not found in database",
            })
        }

        res.json(project)
    } catch (err) {
        next(err)
    }
})

//POST new project
router.post("/", async (req, res, next) => {
    try {
        await db("projects").insert(req.body)
        res.status(201).json(req.body)
    } catch (err) {
        next(err)
    }
})

module.exports = router
