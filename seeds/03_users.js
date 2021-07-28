
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1',password:"client123"},
        {id: 2, username: 'user2',password:"client1234"},
        {id: 3, username: 'user3',password:"client12345"}
      ]);
    });
};
