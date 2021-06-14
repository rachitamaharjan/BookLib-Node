const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)



async function add(user){
   return await db('users').insert(user, ['id', 'username'])
   // const [id] = await db('users').insert(user)
   // console.log('ok')
   // return id
}

function find(user){
   return db("users")
}

// function findByID(id){
//    return db("users").where({ id }).first()
// }

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