const mongoose = require("mongoose")

const checkoutSchema = mongoose.Schema({
    book_name: {type: String, required: true},
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    }
},{
    versionKey: false,
    timestamps: true
}
)

module.exports = mongoose.model("checkout", checkoutSchema)