const express = require("express")


const app = express()
app.use(express.json())


module.exports = app

const sectionController = require("./controllers/sections.controller")
const authorController = require("./controllers/authors.controller")
const bookController = require("./controllers/books.controller")
const checkoutController = require("./controllers/checkouts.controller")
