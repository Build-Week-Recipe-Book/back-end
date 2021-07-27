
exports.up = function(knex) {
    return knex.schema.createTable('recipes',tbl =>{
        tbl.increments(); //creates primary key called id
        tbl.text('title',128).notNullable(); //creates a text field called title which is required and unique
        tbl.text('source',128);
        tbl.text('category',128)
    })

  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('recipe');
  
};
