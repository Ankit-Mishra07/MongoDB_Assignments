const express = require("express");

const router = express.Router();

const crudController = require("./crud.controller")

const Evaluation = require("../models/evaluation.model")
const Student = require("../models/student.model")

router.post("", crudController.post(Evaluation))
router.get("", crudController.getAllWithTwoPopulate(Evaluation, {path: "instructor_id", select: "first_name last_name"}, {path: "topic_id"}));
router.get("/:id", crudController.getOneWithTwoPopulate(Evaluation, {path: "instructor_id", select: "first_name last_name"}, {path: "topic_id"}));
router.get("/:id/students", crudController.getAllWithTwoPopulateEvalId(Evaluation, Student, {path:"user_id", select:"first_name last_name"}, {path: `evaluation_id`}))
router.patch("/:id", crudController.updateOne(Evaluation));
router.delete("/:id", crudController.deleteOne(Evaluation));
router.get("/:id/topper", crudController.GetTopper(Evaluation, Student, {path:"user_id"}, {path: `evaluation_id`}))

module.exports = router;