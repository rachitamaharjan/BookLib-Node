
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments()
        table.text('username', 100).notNullable().unique().index()
        table.text('email', 254).notNullable()
        table.text('password', 127).notNullable()
        table.boolean('is_admin').notNullable().defaultTo(0)
        table.timestamps(true, true)
    })
    .createTable('favorites', function(table){
        table.increments()
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to users
        table.integer('book_id').notNullable().unsigned().references('id').inTable('books').onDelete('CASCADE').onUpdate('CASCADE') //foreign key to books
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("favorites")
};
