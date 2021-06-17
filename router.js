
const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const bookController = require('./controller/bookController')

const authenticate = require('./middlewares/authenticate')
// const authorize = require('./middlewares/authorize')

router.use('/user', userController)
router.use('/books', authenticate, bookController)


module.exports = router
