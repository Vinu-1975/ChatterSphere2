const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    avatarImage:{
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User