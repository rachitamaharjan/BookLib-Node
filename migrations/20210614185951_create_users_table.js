
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments()
        table.text('username', 100).notNullable().unique().index()
        table.text('email', 200).notNullable()
        table.text('password', 200).notNullable()
        table.boolean('is_admin').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
