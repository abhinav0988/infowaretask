const mongoose = require("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId
const OrderSchema= new mongoose.Schema({
    items: [{
        productId: {type: ObjectId, ref:"Product"},
       
      }],
      
      
      cancellable: {type:Boolean, default: false},
      status: {type: String, default: 'pending', enum:["pending", "completed", "cancelled"]},
   
   
    UserId:{
        type:ObjectId,
        ref:"user"
    },
    isDeleted: {type:Boolean, default: false},
    
},{timestamps:true})


module.exports=mongoose.model("order",OrderSchema)