const express = require("express")

const app = express()

app.use(express.json())

module.exports = app

const userController = require("./controllers/users.controller")

app.use("users", userController)