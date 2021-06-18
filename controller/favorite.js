const express = require('express')


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


router.post('/', (req, res) => {
    console.log('user inside', req.user)
    const id = req.user.id
    const book_id = req.body.book_id
    favorites.add({book_id, user_id: parseInt(id) })
    .then(favorite => {
        console.log('favorite')
        res.status(200).json(favorite)
    })
    .catch(error => {
        res.status(500).json({message : 'cannot add favorite ', error: String(error)})
    }) 
})



module.exports = router