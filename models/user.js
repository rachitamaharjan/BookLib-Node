// const knex = require('knex')
// const config = require('../knexfile')
// const db = knex(config.development)
const db = require('../dbConfig')


async function add(user){
   return await db('users').insert(user, ['id', 'username'])
}

function find(user){
   return db("users")
}

function findByUsername(username){
   return db("users").where({ username }).first()
}


function update(id, changes){
   return db("users").where({ id }).update(changes, [id])
}

function remove(id){
   return db("users").where({ id }).del()
}

module.exports = {
    add, find, findByUsername, update,  remove
}