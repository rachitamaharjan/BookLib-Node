
exports.up = function(knex) {
  return knex.schema.createTable('books', function(table){
      table.increments()
      table.text('title', 100).notNullable().index()
      table.text('genre', 100).notNullable()
      table.text('author', 100).notNullable()
      table.text('description', 100)
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books')
};
