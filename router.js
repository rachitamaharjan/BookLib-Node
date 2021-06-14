
const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const bookController = require('./controller/bookController')

router.use('/user', userController)
router.use('/books', bookController)

// app.use('/api', (req, res) => {
//     res.json({
//         msg: 'h'
//     })
// })

// router.get('/register',(req, res) => {
//     res.json({
//         msg: 'hoohhoo'
//     })
//     console.log('heyy')
// })

// app.listen(3000, () => {
//     console.log('Server Starting at Port 3000')
// })

module.exports = router
