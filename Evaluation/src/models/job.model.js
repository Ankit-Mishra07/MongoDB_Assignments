const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    job_name : {type: String, required: true},
    city: {type: String, required: true},
    skill_req: {type: String, required: true},
    job_type: {type: String, required: true},
    notice_period: {type: Boolean, required: false},
    job_rating: {type: Number, required: false},
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "compani",
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("job", jobSchema)