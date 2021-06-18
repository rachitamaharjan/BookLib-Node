
exports.up = function(knex) {
    return knex.schema
    .createTable('favorites', function(table){
        table.increments()
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to users
        table.integer('book_id').notNullable().unsigned().references('id').inTable('books').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to books
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("favorites")
};
