const express = require("express")


const app = express()
app.use(express.json())

const userController = require("./controllers/users.controller")
const postController = require("./controllers/posts.controller")
const tagController = require("./controllers/tags.controller")
const commentController = require("./controllers/comments.controller")

module.exports = app

app.use("/posts", postController)
app.use("/users", userController)
app.use("/tags", tagController)
app.use("/comments", commentController)

/*
  users
  post = /users
  get all = /users
  get one = /users/:id
  update one = /users/:id
  delete one = /users/:id
*/