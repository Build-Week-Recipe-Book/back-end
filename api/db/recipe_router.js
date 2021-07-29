const router = require('express').Router();
const Recipe = require('./recipe-model');


router.get ("/",async(req, res, next)=>{
    const recipes = await Recipe.find()
    
    res.status(200).json({
        message:'SUCCESS',
        recipes
    })
    
})

 

router.get('/:id',async (req,res,next)=>{
  // const id =  req.params.id;
  const recipe =  await Recipe.findById(req.params.id)
  
  res.status(201).json(recipe)
     })

   


 router.post('/:id/addRecipe', async(req,res,next)=>{
    try {
        const { recipeName,ingredient,instructions} = req.body
        const id = req.params.id
        const newRecipe = await Recipe.addRecipe(req.body, id)
        console.log("New user", newRecipe)
        res.status(201).json(newRecipe)

    }
    catch (err) {
        next(err)
    }
 })

 router.put("/:id/editPotluck", async (req, res, next) => {
    try {
        const { recipeName,ingredients, instructions } = req.body
        const id = req.params.id
        const idCheck = await Recipe.findById(id)
        console.log("recipe", idCheck)
        if (!idCheck) {
            res.status(409).json({
                message: "InValid recipe Id"

            })

        }
        const editRecipe = await Recipe.updateRecipe(req.body, id)
        console.log("Edit", editRecipe)
        res.status(200).json(editRecipe)
    }
    catch (err) {
        next(err)
    }
})


router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    const deleted = await Recipe.deleteRecipe(id)
    try {
        if (deleted) {
            res.status(200).json({
                message: "recipe has been deleted"
            })
        }
    }
    catch (err) {
        next(err)
    }



})



module.exports = router;