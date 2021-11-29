const express = require("express")
const app = require("..")

const router = express.Router()

const Company = require("../models/company.model")
const crudController = require("./crud.controller")
router.post("" , crudController.post(Company))
router.get("" , crudController.getALL(Company))

router.get("/mostjobs" , crudController.getCom(Company))

module.exports = router