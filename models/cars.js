const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    Car:{
        type:String,
        required:true,
    },
    Id:{
        type:String,
        required:true,
    },
    Color:{
        type:String,
        required:true,
    },
    Price:{
        type:String,
        required:true,
    }, 
    Model:{
        type:String,
        // required:true,
    }
}, { timestamps: true });

const Cars=mongoose.model("Cars",userSchema);
module.exports={Cars};