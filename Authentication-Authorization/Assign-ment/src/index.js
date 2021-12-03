const express = require("express")

const app = express()

app.use(express.json())

module.exports = app

const {register, login} = require("./controllers/auth.controller")

const postController = require("./controllers/post.controller")

app.post("/register", register)

app.post("/login", login)

app.use("/posts", postController)