
exports.up = function(knex, Promise) {
  return knex.schema.createTable('guests', function(t){
    t.increments();
    t.text('name');
    t.json('json');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guests');
};
