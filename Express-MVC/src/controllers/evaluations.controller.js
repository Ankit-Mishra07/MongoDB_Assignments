const express = require("express");

const router = express.Router();

const crudController = require("./crud.controller")

const Evaluation = require("../models/evaluation.model")

router.post("", crudController.post(Evaluation))
router.get("", crudController.getAll(Evaluation));
router.get("/:id", crudController.getOne(Evaluation));
router.patch("/:id", crudController.updateOne(Evaluation));
router.delete("/:id", crudController.deleteOne(Evaluation));

module.exports = router;