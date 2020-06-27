const db = require("../data/config")

function findTasks(id) {
    return db("tasks")
        .join(
            "projects", 
            "projects.id", 
            "tasks.project_id"
            )
        .select(
            "tasks.project_id",
            "projects.project_name",
            "projects.description",
            "tasks.description as task_description"
        )
}

function findTaskByID(id) {
    return db("tasks").where({ id })
}

function createTask(task) {
    return db("tasks")
        .insert(task)
        .then(([id]) => getTaskByID(id))
}

module.exports = {
    findTasks,
    findTaskByID,
    createTask,
}