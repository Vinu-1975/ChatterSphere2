const Chat = require('../model/chatModel')
const Message = require('../model/messageModel')
const User = require('../model/userModel')

module.exports.sendMessage = async(req,res) => {
    const { content,chatId } = req.body
    if(!content || !chatId){
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    console.log(newMessage)
    try{
        var message = await Message.create(newMessage)
        
        message = await message.populate("sender","username avatarImage")
        // message = await message.populate("sender","name pic")
        message = await message.populate("chat")
       
        message = await User.populate(message,{
            path:'chat.users',
            select:'username avatarImage email'
            // select:'name pic email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })
        
        return res.json(message)
    }catch(error){
        console.log(err)
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports.allMessages = async(req,res)=>{
    
    try{
        const messages = await Message.find({chat:req.params.chatId})
            .populate("sender","username avatarImage email")
            // .populate("sender","name pic email")
            .populate("chat")
        
        // console.log(messages)
        res.json(messages)
        
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
}