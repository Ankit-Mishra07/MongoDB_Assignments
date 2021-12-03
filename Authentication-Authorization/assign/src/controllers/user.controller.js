const express = require("express")

const router = express.Router();

const User = require("../models/user.model")

router.get("/", async (req, res) => {
    const user = await User.find({}).select("-password").lean().exec()
    res.status(201).send(user)

})


module.exports = router