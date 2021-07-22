const { moduleExpression } = require('@babel/types');
const db = require('../../data/db-config');

const getAll = () =>{
    //GET ALL RECIPES

}

const getById = id =>{
    //GET RECIPE BY ID
    
}

const create = recipe =>{
    //CREATE NEW RECIPE

}

const updateById = (id,recipe) =>{
    //EDIT AND UPDATE OLD RECIPE

}

const deleteById = id =>{
    // DELETE RECIPE BY  ID

}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}