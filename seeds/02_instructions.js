
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, ingredients: 'salt', steps:["Add salt"]},
        {id: 2, ingredients: 'pepper', steps:["Add Pepper"]},
        {id: 3, ingredients: 'steak', steps:["Brown Steak"]}
      ]);
    });
};
