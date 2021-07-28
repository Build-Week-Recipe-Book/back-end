
const db = require('../../data/db-config');



 function find() {
    //GET ALL RECIPES
    
    return  db("recipes").select("*")


}

async function addRecipe(id,recipe){
    const data = {recipe_id:id,...recipe}
    const newRecipe = await db("recipe").insert(data).returning("newRecipe")
    console.log("newRecipe",id)
    return newRecipe
}

async function addUsers(data) {
    const id = await db("users").insert(data).returning("ID")
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
        .select("recipe_Id", "recipeName",  "ingredients", "instructions", "userId")
        .where("recipe_id", id)
        .first()
}


async function updateRecipe (id,data) {
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
    addUsers,
    deleteRecipe,
    updateRecipe
}