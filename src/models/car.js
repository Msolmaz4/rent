const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({


     plateNumber:{
        type:String,
        trim:true,
        requred:true,
        unique:true
     },
     brand:{
        type:String,
        trim:true,
        requred:true,
     },
     model:{
        type:String,
        trim:true,
        requred:true,
     },
     year:{
        type:Number,
        requred:true,
        min:2010
     },
     isAutomatic:{
        type:Boolean,
        default:false,

     },
     pricePerDay:{
        type:Number,
        requred:true,
        trim:true,
     },
     isPublish:{
        type:Boolean,
        default:true

     },
     createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requred:true
     },
     updateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requred:true
     },

},{
 collection:"cars",timestamps:true
})

module.exports = mongoose.model("Car",CarSchema)