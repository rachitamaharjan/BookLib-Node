
const express = require('express')
const router = express.Router()
const userController = require('./controller/user')
const bookController = require('./controller/book')
const favController = require('./controller/favorite')

const authenticate = require('./middlewares/authenticate')
// const authorize = require('./middlewares/authorize')

router.use('/user', userController)
router.use('/books', authenticate, bookController)
router.use('/favorites',authenticate, favController)


module.exports = router
