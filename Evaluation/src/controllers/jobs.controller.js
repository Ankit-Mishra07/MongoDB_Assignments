const express = require("express")

const router = express.Router()

const Job = require("../models/job.model")
const crudController = require("./crud.controller")

router.post("", crudController.post(Job))
router.get("" , crudController.getall(Job, "company_id"))

router.get("/cityskill", crudController.getAll1(Job, "champa","coder"))
router.get("/type", crudController.getAll2(Job, "work from home"))
router.get("/notice", crudController.getAll3(Job, true))
router.get("/rating", crudController.getAll4(Job))
router.get("/:id/detail",crudController.getData(Job, {path: "company_id"}) )

module.exports = router