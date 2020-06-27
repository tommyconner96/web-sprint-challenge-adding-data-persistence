const express = require("express")
const db = require("../data/config")
const router = express.Router()

//GET all resourses
router.get("/", async (req, res, next) => {
    try {
        res.json(await db("resources"))
    } catch (err) {
        next(err)
    }
})

//GET resource by id
router.get("/:id", async (req, res, next) => {
    try {
        const resource = await db("resources").where("id", req.params.id).first()

        if (!resource) {
            return res.status(404).json({
                message: "resource with that ID not found in database",
            })
        }

        res.json(resource)
    } catch (err) {
        next(err)
    }
})


//POST new resource
router.post("/", async (req, res, next) => {
    try {
        await db("resources").insert(req.body)
        res.status(201).json(req.body)
    } catch (err) {
        next(err)
    }
})

module.exports = router