
const mongoose = require("mongoose")


// Tag Schema

const tagSchema = new mongoose.Schema({
    name: {type: String, required: true}

},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("tag", tagSchema)
