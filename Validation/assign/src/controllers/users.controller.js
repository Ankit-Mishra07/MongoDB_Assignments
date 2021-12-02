const express = require("express")
const {body, validationResult} = require("express-validator")

const router = express.Router();

const User = require("../models/user.model")

router.post("/",
body("id").isLength({min: 1}).withMessage("id is required"),
body("first_name").isLength({min: 1}).withMessage("first name is required"),
body("last_name").isLength({min: 1}).withMessage("last name is required"),
body("age").custom(async (value) => {
    const isNumber = /^[0-9]*$/.test(value); //true or false
    if(!isNumber || value > 28) {
        throw new Error("age should not be greater than 28")
    }
}),
body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    const listOfDomain = ["gmail.com", "yahoo.com"];
    const email = value.split("@");

    if(!listOfDomain.includes(email[1])) {
        throw new Error("We do not accept emails from this domain");
    }

    if(!isEmail) {
        throw new Error("Please enter a proper email address");
    }
    const userByEmail = await User.findOne({ email : value })
    .lean()
    .exec()

    if(userByEmail) {
        throw new Error("Please try with a different email address")
    }
    return true;

}),
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