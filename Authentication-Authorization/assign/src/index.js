const express = require("express")

const app = express()

app.use(express.json())

module.exports = app

const {signup, signin} = require("./controllers/auth.controller")

app.post("/signup", signup)
app.post("/signin", signin)
