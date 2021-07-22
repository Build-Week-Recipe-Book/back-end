 const express = require('express');
 const router = express.Router();



 const Recipe = require('./recipe-model');

 const middleware = require('../middleware');

 router.get('/',(req,res,next)=>{
     res.send('Hello')
 })

module.exports = router;