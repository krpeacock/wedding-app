
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gifts', function(t){
    t.increments();
    t.integer('guest_id').unsigned().index().references('id').inTable('guests').onDelete('cascade');
    t.text('description');
    t.text('img');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gifts');
};
