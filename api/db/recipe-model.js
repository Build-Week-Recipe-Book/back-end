
const db = require('../../data/db-config');

//RECIPES

 function find() {
    //GET ALL RECIPES
    
    return  db("recipes").select("*")


}

 async function addRecipe(data){
    //console.log(data)
    const newRecipe = await db("recipes").insert(data)
    
    return newRecipe
}


 function findById(id) {
   
    return  db("recipes").select("id","title","source")
        .where("id",id)
        
}


   async function updateRecipe (id,data) {
    //EDIT AND UPDATE OLD RECIPE
    console.log(data)
    const count = await db('posts').where(id).update(data);
    
    return count;
    

    



}

 function deleteRecipe(id){
    // DELETE RECIPE BY  ID
return db("recipes")
    .where("id",id = false)
    .del(['title','source'])
    

}
//USERS

function findUser() {
    return db('users').select('id', 'username', 'password');
}
async function addUsers(data) {
    const newUser = await db("users").insert(data)
    return newUser

}
 function findByUserId(id) {
    return  db("user").select("username","password")
    .where("id",id)
}
module.exports = {
    find,
    findById,
    findUser,
    findByUserId,
    addRecipe,
    addUsers,
    deleteRecipe,
    updateRecipe
}