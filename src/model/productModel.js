const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },
    
    color: {
        type:String,
        required: true,
        unique: true,

    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },


}, { timestamps: true })
module.exports = mongoose.model("Product", ProductSchema)