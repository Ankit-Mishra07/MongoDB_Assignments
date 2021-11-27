const express = require("express")

const router = express.Router()

const crudController = require("./crud.controller")

const User = require("../models/user.model")

router.post("", crudController.post(User))
router.get("", crudController.getAll(User))
router.get("/:id", crudController.getOne(User))
router.patch("/:id", crudController.updateOne(User))
router.delete("/:id", crudController.deleteOne(User))

module.exports = router;