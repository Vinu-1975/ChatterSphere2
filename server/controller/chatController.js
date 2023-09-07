const Chat = require('../model/chatModel')
const User = require('../model/userModel')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dux8bgl5g',
    api_key: '318481684521768',
    api_secret: 'sw4CtXe5NuVXxqNQjS1sejIRBZY',
    secure: true,
});


module.exports.accessChat = async (req,res) => {
    // console.log("accessChat")
    const { userId } = req.body

    if(!userId){
        console.log("UserId param not sent with request")
        return res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"username avatarImage email"
        // select:"name pic email"
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat : false,
            users: [req.user._id,userId]
        }
        try{
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id:createdChat._id})
            .populate("users","-password")
            // res.status(200).send(FullChat)
            res.status(200).json(FullChat)
        }catch(error){
            res.status(400)
            throw new Error(error.message)
        }
    }
}

module.exports.fetchChats = async (req,res) => {
    try{
        // console.log("fetchChats");
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
            .populate("users","-password")
            .populate("groupAdmin","-password")
            .populate("latestMessage")
            .sort({updatedAt:-1})
            .then(async(result)=>{
                result = await User.populate(result,{
                    path:"latestMessage.sender",
                    select:"username avatarImage email",
                    // select:"name pic email",
                })
                res.status(200).send(result)
            })
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports.createGroupChat = async (req,res) => {
    
    // if(!req.body.users || !req.body.name){
    //     return res.status(400).send({message:"Please Fill all the fields"})
    // }
    // var users = JSON.parse(req.body.users);
    // if(users.length < 2){
    //     return res.status(400).send("More than 2 users are required to form a group chat")
    // }
    // users.push(req.user)
    // try{
    //     const groupChat = await Chat.create({
    //         chatName: req.body.name,
    //         users:users,
    //         isGroupChat:true,
    //         groupAdmin:req.user
    //     })

    //     const fullGroupChat = await Chat.findOne({_id:groupChat._id})
    //     .populate("users","-password")
    //     .populate("groupAdmin","-password")

    //     res.status(200).json(fullGroupChat)

    // }catch(error){
    //     res.status(400)
    //     throw new Error(error.message)
    // }



    try {
        // Check for necessary fields
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ message: "Please fill all the fields." });
        }
        let groupAvatar = null;
        
        console.log('shit')
        // If an image is provided, upload it to cloudinary
        if (req.file) {
            const mime = req.file.mimetype;
            const base64 = req.file.buffer.toString('base64');
            const base64URL = `data:${mime};base64,${base64}`;
            const result = await cloudinary.uploader.upload(base64URL, {
                public_id: `group-${Date.now()}`,  // Unique ID based on timestamp
                // upload_preset: 'chat-app'  // Uncomment if you have an upload preset
            });
            groupAvatar = result.url;
        }

        const users = JSON.parse(req.body.users);
        if (users.length < 2) {
            return res.status(400).send("More than 2 users are required to form a group chat.");
        }
        users.push(req.user);

        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
            avatarImage: groupAvatar // Set the avatar image URL
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        console.error(error);  // Provides better visibility in console.
        res.status(400).send({ message: error.message });
    }
    
}

module.exports.renameGroup = async(req,res)=>{
    const { chatId,chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!updatedChat){
        res.status(404)
        throw new Error("Chat not Found")
    }else{
        res.json(updatedChat)
    }
}

module.exports.addToGroup = async(req,res)=>{
    console.log("addToGroup")
    const {chatId,userId} = req.body
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {$push:{users:userId},},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
        res.status(404)
        throw new Error("Chat not Found")
    }else{
        res.json(added)
    }
}

module.exports.removeFromGroup = async(req,res)=>{
    const {chatId,userId} = req.body
    const removed =await Chat.findByIdAndUpdate(
        chatId,
        {$pull:{users:userId},},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!removed){
        res.status(404)
    throw new Error("Chat not Found")
    }else{
        res.json(removed)
    }
}