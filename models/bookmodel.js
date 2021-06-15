// const knex = require('knex')
// const config = require('../knexfile')
// const db = knex(config.development)
const db = require('../dbConfig')


async function add(book){
   const [id] = await db('books').insert(book)
   return id
}

function find(book){
   return db("books")
}

function findByID(id){
   return db("books").where({ id }).first()
}

function update(id, changes){
   return db("books").where({ id }).update(changes, [id])
}

function remove(id){
   return db("books").where({ id }).del()
}

module.exports = {
    add, find, findByID, update,  remove
}