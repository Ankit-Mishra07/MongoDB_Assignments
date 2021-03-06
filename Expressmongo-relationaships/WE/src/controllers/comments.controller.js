const Comment = require("../models/comment.model")
const express = require("express")

const router = express.Router()


// COMMENTS CRUD ------------------->

router.post("", async (req, res) => {
    try{

        const comment = await Comment.create(req.body)
        return res.status(201).send(comment)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("", async (req, res) => {
    try{
        const comment = await Comment.find().lean().exec()
        return res.status(201).send(comment)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id).populate({path: "user_id", select: "first_name"}).lean().exec()
        res.status(201).send(comment)
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.patch("/:id", async (req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec()
        res.status(201).send(comment)
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})
router.delete("/:id", async (req, res) => {
    try{

        const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(201).send(comment)


    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

module.exports = router
