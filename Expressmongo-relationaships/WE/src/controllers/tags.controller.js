
// TAG CRUD------------------------>

const Tag = require("../models/tag.model")
const Post = require("../models/post.model")

const express = require("express")

const router = express.Router()



router.post("", async (req, res) => {

    try{

        const tag = await Tag.create(req.body)
       return res.status(201).send(tag)
    }catch(e) {
       return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("", async (req, res) => {
    try{
        const tag = await Tag.find().lean().exec()
        res.status(201).send(tag)
    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/:id", async (req, res) => {
    try{

        const tag = await Tag.findById(req.params.id).lean().exec()
       return res.status(201).send(tag)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.patch("/:id", async (req, res) => {
    try{
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).lean().exec()
    return res.status(201).send(tag)
}catch(e) {
    return res.status(500).json({message: e.message, status: "Failed"})
}

})

router.delete("/:id", async (req, res) => {
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(tag)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


// to get the posts in which particular tag is present

router.get("/:id/posts", async (req, res) => {
    try{

        const tag = await Tag.findById(req.params.id).lean().exec()
        const posts = await Post.find({tag_ids: tag_id}).populate("tag_ids").lean().exec()
        return res.status(201).send({posts, tag})

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

module.exports = router;