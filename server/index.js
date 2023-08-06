const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const app = express();
require('dotenv').config()
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1/ChatterSphere")
.then(()=>{
  console.log("MOngoose connected successfully")
})
.catch(err => console.log('failed'))

app.use("/api/auth/",userRoutes)

const server = app.listen(5000, () => console.log('Proxy server running on port 5000'));
