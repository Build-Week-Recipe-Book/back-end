const express = require('express');

const recipeRouter = require('./recipe/recipe-router');

const db = require ('../data/db-config');

const server = express();

//MIDDLEWARE

server.use(express.json());
server.use('./api/recipe',recipeRouter);


// import the router into the server

server.get('/',(req,res,next)=>{
    return 
    res.send('<h1>I AM THE SERVER</h1>');
});

server.use((err,req,res,next)=>{
    console.log(err)
    return res.status(500).json({message:'Something went wrong'})
});




module.exports =server;

