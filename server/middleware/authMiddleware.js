const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const protect = async(req,res,next)=>{
    let token;
    console.log("protect")
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
        if(!token){
            res.status(401)
            throw new Error("Not authorized, no token")
        }
    }

}

module.exports = { protect }