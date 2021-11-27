const express = require("express")
const app = express()

app.use(express.json())
module.exports = app

const topicController = require("./controllers/topics.controller")
const userController = require("./controllers/users.controller")
const evaluationController = require("./controllers/evaluations.controller")
const studentController = require("./controllers/students.controller")


app.use("/topics", topicController)
app.use("/users", userController)
app.use("/evaluations", evaluationController)
app.use("/students", studentController)