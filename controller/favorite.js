const express = require('express')
// const app = express()


const router = express.Router()
const favorites = require('../models/favorite')
const authorize = require('../middlewares/authorize')


router.get('/', (req, res) => {
    console.log('controller inside')
    const user_id = req.user.id
    favorites.find(user_id)
    .then( favorites => {
        res.status(200).json(favorites)
    })
    .catch(error => {
        res.status(500).json({ message: 'Unable to perform operation ', error: String(error)})
    })
})

// router.get('/:id', (req, res) => {
//     const { id } = req.params
//     books.findByID(id)
//     .then( book => {
//         if(book){
//             res.status(200).json(book)
//         }
//         else{
//             res.status(404).json({message: "Book not found"})
//         }
//     })
//     .catch(error => {
//         res.status(500).json({ message: 'Unable to perform operation ', error: String(error)})
//     })
// })

// router.use(authorize)

router.post('/:user_id', (req, res) => {
    console.log('user inside', req.user)
    const id = req.user.id
    const book_id = req.body.book_id
    // console.log('add book',req.body)
    // const { password } = req.body
    favorites.add({book_id, user_id: parseInt(id) })
    .then(favorite => {
        console.log('favorite')
        res.status(200).json(favorite)
    })
    .catch(error => {
        res.status(500).json({message : 'cannot add favorite ', error: String(error)})
    }) 
})

// router.use(authorize)
// router.patch('/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     // console.log('k',id)
//     books.update(id, changes)
//     .then(bookID => {
//         if(bookID){
//             res.status(200).json(bookID)
//         }
//         else{
//             res.status(404).json({message: "Unable to locate book"})
//         }
//     })
//     .catch(error => {
//         res.status(500).json({message : 'Cannot update book ', error: String(error)})
//     }) 
// })

// router.use(authorize)
// router.delete('/:id', (req, res) => {
//     // console.log('user',req.user)
//     const { id } = req.params;
//     books.remove(id)
//     .then (delCount => {
//         if (delCount > 0){
//             res.status(200).json({ message: "Successfully deleted "})
//         }
//         else{
//             res.status(404).json({message: "Unable to locate book"})
//         }
//     })
//     .catch(error => {
//         res.status(500).json({message : 'Unable to delete ', error: String(error)})
//     }) 
    
// })



module.exports = router