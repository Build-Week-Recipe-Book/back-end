
const db = require('../../data/db-config');



 function find() {
    //GET ALL RECIPES
    
    return  db("recipes").select("*")


}

function addRecipe(id,title){
    const data = {recipe_id:id,...title}
    const newRecipe =db("recipe").insert(data)
   // console.log("newRecipe",id)
    return newRecipe
}

 function addUsers(data) {
    const id = db("users").insert(data).returning("ID")
    console.log("ID", id)
    return findByUserId(id)

}
 function findByUserId(id) {
    console.log("findUserBy", id)
    return  db("users")
        .select("ID", "username", "password","email")
        .where("ID", id)
        .first()
}

 function findById(id) {
   // console.log("addRecipe id", id)
    return  db("addRecipe")
        .select("id", "title",  "ingredients", "instructions", "userId")
        .where("id", id)
        .first()
}


 function updateRecipe (id,data) {
    //EDIT AND UPDATE OLD RECIPE
   // console.log("updateRecipe",id)
     db("addRecipe").where("id",id)
    .update(data)
    return findById(id)

}

 function deleteRecipe(id){
    // DELETE RECIPE BY  ID
    console.log("updateRecipe",id)
     db("addRecipe")
    .where("id",id)
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