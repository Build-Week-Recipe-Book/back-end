const db = require('../../data/db-config');


const getAll = () =>{
    //GET ALL RECIPES
    const recipes = db('recipes');
    return recipes


}

const getById = id =>{
    //GET RECIPE BY ID
    const recipeId = db('recipes').where({id});
    return recipeId
    
}

const create = recipe =>{
    //CREATE NEW RECIPE
    const newRecipe = db('recipes').insert(recipe);
    return newRecipe;

}

const updateById = (id,recipe) =>{
    //EDIT AND UPDATE OLD RECIPE
    return db('recipes').update(recipe).where({id});

}

const deleteById = id =>{
    // DELETE RECIPE BY  ID
    return db('recipes').del().where({id});

}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}