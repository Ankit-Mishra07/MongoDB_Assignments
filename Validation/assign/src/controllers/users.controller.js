const express = require("express")
const {body, validationResult} = require("express-validator")

const router = express.Router();

const User = require("../models/user.model")

router.post("/",
body("id").isLength({min: 1}).withMessage("id is required"),
body("first_name").isLength({min: 1}).withMessage("first name is required"),
body("last_name").isLength({min: 1}).withMessage("last name is required"),
body("age").isLength({min:1}).withMessage("age is required"),
body("email").isEmail().withMessage("Email.is required and it should be valid"),
body("pincode").isLength({min: 6, max: 6}).withMessage("pincode should be valid"),
body("gender").isLength({min: 3}).withMessage("gender is required must be atlease 3 character"),



async (req, res) => {
    
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            let newErrors = errors.array().map(({msg, param, location}) => {
                return {
                    [param] : msg
                }
            })
            return res.status(400).json({ errors: newErrors })
        }

        const user = await User.create(req.body)
        return res.status(201).json({data : user})


})


module.exports = router