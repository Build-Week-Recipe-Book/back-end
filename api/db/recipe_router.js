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
   //const id =  req.params.id;
  const recipe =  await Recipe.findById(req.params.id)
  
  res.status(200).send(recipe)

  
     })

   
 router.post('/',(req,res)=>{
    
     const newRecipe = req.body;
     //console.log(newRecipe);
     Recipe.addRecipe(newRecipe)
     res.status(201).send("Created recipe")
     

 })

 router.put("/:id/editRecipe",  async(req, res, next) => {
     const changes = req.body
     console.log(changes)
     await Recipe.updateRecipe({changes});
     res.status(200).send("Updated recipe")
    
})


router.delete("/:id", (req, res, next) => {
    const deleted = Recipe.deleteRecipe(req.params.id)
    Recipe.deleteRecipe(deleted)
    console.log(deleted)
    res.status(200).send('Deleted recipe')

})



module.exports = router;