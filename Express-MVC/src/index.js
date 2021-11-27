const express = require("express")
const app = express()

app.use(express.json())
module.exports = app

const topicController = require("./controllers/topics.controller")
