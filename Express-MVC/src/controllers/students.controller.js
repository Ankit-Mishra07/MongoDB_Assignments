const express = require("express")

const router = express.Router();
const Student = require("../models/student.model")
const crudController = require("./crud.controller")

router.post("", crudController.post(Student))
router.get("", crudController.getAllWithTwoPopulate(Student, {path:"user_id", select:"first_name last_name"}, {path: `evaluation_id`} ))
router.get("/:id", crudController.getOneWithTwoPopulate(Student, {path:"user_id", select:"first_name last_name"}, {path: "evaluation_id"} ))
router.patch("/:id", crudController.updateOne(Student))
router.delete("/:id", crudController.deleteOne(Student))


module.exports = router;