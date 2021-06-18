
const db = require('../dbConfig')


async function add(favorite){
  console.log('favorite', favorite)
   const [id] = await db('favorites')
   .insert(favorite)
   return id
}

async function find(user_id){
   // return db("favorites").where({ user_id })
   console.log('user id', user_id)
   const res = await db('favorites')
  .leftJoin('books', 'books.id', 'favorites.book_id')
  .select('*')
  .where ({user_id : user_id})
  return res
}

module.exports = {
    add, find
}