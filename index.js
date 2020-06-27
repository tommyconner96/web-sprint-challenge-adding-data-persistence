const express = require("express")
const helmet = require("helmet")
const projectRouter = require("./projects/project-router")
const resourceRouter = require("./resources/resource-router")
const taskRouter = require("./tasks/task-router")

const server = express()
const port = process.env.PORT || 3333

server.use(helmet())
server.use(express.json())

server.use("/projects", projectRouter)
server.use("/resources", resourceRouter)
server.use("/projects/:id/tasks", taskRouter)

server.use((err, req, res, next) => {

  res.status(500).json({
    message: "Oops! Something went wrong.",
  })
})

server.listen(port, () => {
  console.log(`server listening at port ${port}`)
})