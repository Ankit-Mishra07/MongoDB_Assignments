const mongoose = require("mongoose")
 

const companySchema = mongoose.Schema({
    name : {type: String, required: true},
    vacancies: {type: Number, required: true}
}, {
    versionKey : false,
    timestamps: true
})

module.exports = mongoose.model("compani", companySchema)