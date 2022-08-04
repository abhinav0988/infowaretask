const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Mobileno: {
        type: String,
         required: true,
        unique: true,

    },
    Email: {
        type: String,
        required: true,
        unique: true

    },

    Password: {
        type: String,
        required: true

    },
    ProfilePhoto: {
        type:String

    },
    isDeleted: {
        type: Boolean,
        default: false
    },



}, { timestamps: true })
module.exports = mongoose.model("user", UserSchema)