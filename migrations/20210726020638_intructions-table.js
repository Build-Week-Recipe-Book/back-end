
exports.up = function(knex) {
    return knex.schema.createTable('instructions',tbl =>{
        tbl.increments();
        tbl.text('ingredients',128).notNullable();
        tbl.text('steps',128);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('instructions');
  
};
