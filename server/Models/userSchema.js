const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    role:{
      type:String,
      required:true
    },
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    profileImageUrl:{
      type:String,

    }
  },{"strict":"throw"})
const userschema=mongoose.model('userschema',userSchema)
module.exports=userschema;