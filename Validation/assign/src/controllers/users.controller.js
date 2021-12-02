const express = require("express")

const router = express.Router();

const User = require("../models/user.model")

router.post("/", async (req, res) => {
    console.log("helo")
})


module.exports = router