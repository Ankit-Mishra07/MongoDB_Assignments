const express = require("express")

const router = express.Router();

const User = require("../models/user.model")

router.post("/" , async (req, res) => {
    try{
    const user = await User.create(req.body)
    res.status(201).send(user)
    }catch(e) {
        res.status(500).json({message: e.message, status : "Failed"})
    }
})


router.get("/" , async (req, res) => {
    try{

    const page = +req.query.page || 1
    const size = +req.query.size || 2
    const skip = (page - 1) * size 
    const user = await User.find().skip(skip).limit(size).lean().exec();
    const totalPages = Math.ceil(
        (await User.find().countDocuments()) / size
    )
    res.status(201).send({user, totalPages})
    }catch(e) {
        res.status(500).json({message: e.message, status : "Failed"})
    }
})

module.exports = router;