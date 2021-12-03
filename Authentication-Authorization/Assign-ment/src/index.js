const express = require("express")

const app = express()

app.use(express.json())

module.exports = app

const {register} = require("./controllers/auth.controller")
//const userController = require("./controllers/user.controller")

app.post("/register", register)
//app.post("/signin", signin)

//app.use("/users", userController)
