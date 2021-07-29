
exports.up = function(knex) {
    return knex.schema.createTable('users',tbl =>{
        tbl.increments(); 
        tbl.text('username',128).notNullable();
        tbl.text('password',64)
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTablesIfExists('users')
  
};
