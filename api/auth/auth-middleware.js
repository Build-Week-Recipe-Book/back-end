const Recipe = require('./auth-model')

exports.checkRecipePayload = (req,res,next) =>{
    
}




exports.checkRecipeId =  async (req,res,next) =>{
    try {
        const recipe = await Recipe.getById(req.params.id);
        if(recipe){
            req.recipe = recipe;
            next()
        }else{
            res.status(404).json({message:"recipe with id <recipe id> is not found"});
        }
    }catch
        (err){
            res.status(500).json({message:"Error processing request", error:err});
        };
    };
