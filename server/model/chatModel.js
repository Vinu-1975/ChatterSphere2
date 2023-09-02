const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName: {
            type:String,
            trim:true,
        },
        isGroupChat:{
            type:Boolean,
            default:false,
        },
        users:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        avatarImage:{
            type:String,
            default: "https://icon-library.com/images/group-avatar-icon/group-avatar-icon-default.jpg",
        }
    },
    {
        timestamps: true,
    }
)

const Chat = mongoose.model("Chat",chatModel)
module.exports = Chat