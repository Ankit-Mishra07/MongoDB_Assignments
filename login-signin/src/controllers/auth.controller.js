require("dotenv").config()

const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

const {body, validationResult} = require("express-validator")

const newToken = (user) => {
    jwt.sign({user, user} , process.env.JWT_SECRET_KEY)
}

const signin = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        let newErrors = errors.array().map(({msg, param, location}) => {
            return {
                [param] : msg
            }
        })
        return res.status(400).json({errors: newErrors})
    }

    let user = await User.findOne({email: req.body.email})
    if(user) {
        return res.status(400).json({status: "Failed", message: "Please Try with Different email"})
    }
}