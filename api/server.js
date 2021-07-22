const express = require('express');

const recipeRouter = require('./recipe/recipe-router');

const db = require ('../data/db-config');

const server = express();

//MIDDLEWARE

server.use(express.json());
server.use('./api/recipe',recipeRouter);

// import the router into the server

module.exports =server;

