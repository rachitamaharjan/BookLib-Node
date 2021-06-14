const express = require('express')
// const app = express()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');

const router = express.Router()
const books = require('../models/bookmodel')

router.post('/register', (req, res) => {
    console.log('register',req.body)
    const { password } = req.body

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('ts5re!', salt, function(err, hash) {
            res.json({
                hash,
                password
            })
        });
    });

    // res.json({
    //     hash
        // email,
        // username,
        // password
        // e : 'u',
        // email : 'y' + req.body,
        // username : username,
        // msg : 'heyy',
        // email : 'email: ' + email,
        // username : 'username: ' + username,
        // email : 'email: ' + email,
    // })
})

router.post('/login', (req, res) => {
    console.log('register',req.body)
    const {email,  password } = req.body
    const dbHash = '$2a$10$ATzT5wuhoPtXnNEuRRq3g.tYk.jyRjskPQAFLfu1Duucj1LnECjD.'

    bcrypt.compare(password, dbHash, function(err, pass) {
        if (err){
            res.json({ error: String(err) })
        }
        else if (pass){
            res.json({
                email,
                password
            })
        }
        else{
            res.json({ msg: 'email or password didn\'t match' })
        }
    });
    
})

module.exports = router