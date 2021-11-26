const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    roll_id :{type: String, required: true},
    current_batch: {type: String, required: true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    result: {
        type: Number
    },
    evaluation_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
})


module.exports = mongoose.model("student", studentSchema)