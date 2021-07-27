
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, ingredients: 'rowValue1', steps:[]},
        {id: 2, ingredients: 'rowValue1', steps:[]},
        {id: 3, ingredients: 'rowValue1', steps:[]}
      ]);
    });
};
