
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, 
          title: 'Fried Chicken',
        source:"Grandma"},
        {id: 2, 
          title: 'Apple Pie',
        source:"Aunty V"},
        {id: 3, 
          title: 'Beef Stew',
        source:"Papa"}
      ]);
    });
};
