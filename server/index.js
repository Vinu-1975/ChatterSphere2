const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const app = express();
require('dotenv').config()
const path = require('path')

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL2)
.then(()=>{
  console.log("MOngoose connected successfully")
})
.catch(err => console.log('failed'))

app.use(express.static('public'))

app.use("/api/auth",userRoutes)
app.use('/api/chats',chatRoutes)
app.use('/api/message',messageRoutes)

// ------------------------Deployment -------------

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname1,'../public/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"../public","build","index.html"))
  })
}else{
  app.get('/',(req,res)=>{
    res.send("API is Running Successfully")
  })
}

// -----------------------Deployment --------------



const server = app.listen(process.env.PORT || 5000, () => console.log('Proxy server running on port 5000'));

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000"
  }
})

io.on('connection',(socket)=>{
  console.log('connected to socket.io');

  socket.on('setup',(userData)=>{
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log("User Joined Room: "+ room);
  })

  socket.on('new message',(newMessageReceived)=>{
    // console.log(newMessageReceived)
    var chat = newMessageReceived.chat;
    if(!chat.users) return console.log('chat.users not defined')

    chat.users.forEach(user=>{
      if(user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit('message received',newMessageReceived)
    })
  })
  socket.off('setup',()=>{
    console.log("User disconnected")
    socket.leave(userData._id)
  })
})