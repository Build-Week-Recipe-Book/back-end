
const db = require('../../data/db-config');



 function find() {
    //GET ALL RECIPES
    
    return  db("recipes").select("*")


}

 async function addRecipe(data){
    console.log(data)
    const newRecipe = await db("recipes").insert(data)
    
    return newRecipe
}

 function addUsers(data) {
    const id = db("users").insert(data).returning("id")
    console.log("id", id)
    return findByUserId(id)

}
 function findByUserId(id) {
    console.log("findUserBy", id)
    return  db("users")
        .select("id", "username", "password","email")
        .where("id", id)
        .first()
}

 function findById(id) {
   
    return  db("recipes").select("id","title","source")
        .where("id",id)
        
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