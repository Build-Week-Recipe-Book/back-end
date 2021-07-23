 const express = require('express');
 const router = express.Router();

 


 const Recipe = require('./recipe-model');

 const middleware = require('../middleware');

 router.get('/', async(req,res,next)=>{
    Recipe.getAll()
    .then(recipes => {
        res.status(200).json(recipes);
    })
    .catch(err =>{
        res.status(500).json({message:"Error retrieving Recipes", error:err});
    })
 })

 router.get('/:id',middleware.checkRecipeId,(req,res,next)=>{
     res.status(200).json(req.recipe);
 });

 router.post('/', middleware.checkRecipePayload, async (req,res,next)=>{
     const recipe = await Recipe.create(req.body);
     res.status(201).json({message: "Recipe created!"});
 });

 router.put('/:id',middleware.checkRecipePayload, middleware.checkRecipeId, async (req,res,next)=>{
     const recipe = await Recipe.updateById(req.params.id,req.body);
     res.status(200).json({message:"Recipe updated!"}, recipe);
 });

 router.delete('/:id', middleware.checkRecipeId, async (req,res,next)=>{
     await Recipe.deleteById(req.params.id);
     res.status(204).send("Recipe deleted!");
 });

 router.use((err,req,res,next)=>{
     // eslint-disable-line
     // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
     res.status(500).json({
         message:'something went wrong inside the recipes router', errMessage:err.message,
     })
     next()
 })

module.exports = router;