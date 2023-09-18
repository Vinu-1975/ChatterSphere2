const generateToken = require('../config/generateToken')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

module.exports.allUsers = async(req, res) => {
    try {
        const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: '^'+ req.query.search, $options: "i" } },
                // { email: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};
        // const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
        const users = await User.find({ 
            ...keyword,
            _id: { $ne: req.user._id }
        }).limit(10);

        console.log(users)
        res.send(users);
    } catch (err) {
        console.error(err);  // This provides better visibility in the console.
        res.status(500).send('Internal server error');
    }
}


module.exports.register = async (req,res,next) => {
    try{
        const { username,email,password } = req.body
        const usernameCheck = await User.findOne({username})
        if(usernameCheck) return res.json({msg:"Username already exist",status:false})
        const emailCheck = await User.findOne({email})
        if(emailCheck) return res.json({msg:"Email already exist",status:false})

        const hashedPassword = await bcrypt.hash(password,10)
        if(!req.file){
            console.log('No file received')
            return res.status(400).send("No file received")
        }
        const mime = req.file.mimetype
        const base64 = req.file.buffer.toString('base64')
        const base64URL = `data:${mime};base64,${base64}`
        const result = await cloudinary.uploader.upload(base64URL,
            {
                public_id:`${req.body.username}`,
                // upload_preset:'chat-app'
            })
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
            avatarImage:result.url
        })
        
        
        // console.log(result)
        returnUser = {
            _id:user._id,
            username:user.username,
            email:user.email,
            imageUrl:result.url,
            token:generateToken(user._id)
        }
        // console.log(returnUser)
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
        returnUser = {
            _id:user._id,
            username:user.username,
            email:user.email,
            imageUrl:user.avatarImage,
            token:generateToken(user._id)
        }
        return res.json({status:true,returnUser})
    }catch(ex){
        next(ex)
    }
}