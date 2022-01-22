const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please Enter Username'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please Enter Password']
    }
});

module.exports=mongoose.model('users',userSchema)