const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("MOngoose connected successfully")
})
.catch(err => console.log('failed'))

app.use(express.static('public'))

app.use("/api/auth",userRoutes)
app.use('/api/chats',chatRoutes)
app.use('/api/message',messageRoutes)



const server = app.listen(process.env.PORT || 5000, () => console.log('Proxy server running on port 5000'));
