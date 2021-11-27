const express = require("express")
const app = express()

app.use(express.json())
module.exports = app

const topicController = require("./controllers/topics.controller")
const userController = require("./controllers/users.controller")
const evaluationController = require("./controllers/evaluations.controller")


app.use("/topics", topicController)
app.use("/users", userController)
app.use("/evaluations", evaluationController)