
const db = require('../../data/db-config');



async function find() {
    //GET ALL RECIPES
    
    return await db("recipes as r").select("r.ID", "r.title")


}

async function addRecipe(recipe,id){
    const data = {recipe_id:id,...recipe}
    const [id] = await db("addRecipe").insert(data).returning("recipe_id")
    console.log("Recipe_id",id)
    return findById(id)
}

async function addUsers(data) {
    const [id] = await db("users").insert(data).returning("ID")
    console.log("ID", id)
    return findByUserId(id)

}
async function findByUserId(id) {
    console.log("findUserBy", id)
    return await db("users")
        .select("ID", "firstName", "lastName", "emailId", "password", "userType")
        .where("ID", id)
        .first()
}

async function findById(id) {
    console.log("addRecipe id", id)
    return await db("addRecipe")
        .select("recipe_Id", "recipeName",  "ingredients", "description", "userId")
        .where("recipe_id", id)
        .first()
}


const updateRecipe = (id,data) =>{
    //EDIT AND UPDATE OLD RECIPE
    console.log("updateRecipe",id)
    await db("addRecipe").where("recipe_id",id)
    .update(data)
    return findById(id)

}

async function deleteRecipe(id){
    // DELETE RECIPE BY  ID
    console.log("updateRecipe",id)
    await db("addRecipe")
    .where("recipe_id",id)
    .del()
    

}

module.exports = {
    find,
    findById,
    findByUserId,
    addRecipe,
    deleteRecipe,
    updateRecipe
}