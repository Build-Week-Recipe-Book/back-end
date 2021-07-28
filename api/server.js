const express = require('express');
const cors = require('cors');
const helmet = require("helmet")
const recipeRouter = require('./auth/auth-router');
const cookieParser = require('cookie-parser');
const server = express();

//MIDDLEWARE
server.use(cookieParser());
server.use(helmet());
server.use(cors())
server.use(express.json());
server.use("/recipes",recipeRouter);



server.get('/',(req,res,next)=>{
    res.send("Welcome to Grandma's Recipe Book")
})


 



module.exports =server;

