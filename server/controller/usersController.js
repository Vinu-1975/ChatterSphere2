const generateToken = require('../config/generateToken')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')


module.exports.register = async (req,res,next) => {
    try{
        const { username,email,password } = req.body
        const usernameCheck = await User.findOne({username})
        if(usernameCheck) return res.json({msg:"Username already exist",status:false})
        const emailCheck = await User.findOne({email})
        if(emailCheck) return res.json({msg:"Email already exist",status:false})

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })
        returnUser = {
            _id:user._id,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        }
        console.log(returnUser)
        delete user.password
        res.status(201).json({status:true,returnUser})
    }catch(ex){
        res.status(400)
        throw new Error("Failed to create an Account")
        next(ex)
    }
}

module.exports.login = async (req,res,next) => {
    try{
        const { username,password } = req.body
        const user = await User.findOne({username})
        if(!user) return res.json({msg:"Incorrect Username or Password",status:false})
        
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return res.json({msg:"Incorrect Username or Password",status:false})
        delete user.password
        return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }
}