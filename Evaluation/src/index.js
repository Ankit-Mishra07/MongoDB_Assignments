const express = require("express")

const app = express()

app.use(express.json())

module.exports = app;

const companyController = require("./controllers/company.controller")

const jobController = require("./controllers/jobs.controller")

app.use("/company" , companyController)
app.use("/jobs", jobController)