const express = require('express')
// const app = express()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var {secret} = require('../config')

const router = express.Router()
// const books = require('../models/bookmodel')
const users = require('../models/usermodel')
const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');


router.post('/register', (req, res) => {
    const credentials = req.body
    let {username, email, password, is_admin} = credentials

    if(!(username && email && password)){
        return res.status(400).json({message: "One or more required fields empty"})
    }
    else{
        const SALT_ROUNDS = 10
        bcrypt.hash(password, SALT_ROUNDS)
            .then(password => {
                users.add({username, email, password, is_admin})
            .then(user => {
                res.status(200).json({id: user, message: "Registration Successful"})
            })
            .catch(err => {
                if(err.errno == 19){
                    res.status(400).json({message: "Username Unavailable"})
                }else res.status(500).json(err)
            })
        })
        
    }
})

router.post('/login', (req, res) => {
    // console.log('register',req.body)
    const {username,  password, is_admin } = req.body
    if(!(username && password)){
        return res.status(400).json({message: "One or more required fields empty"})
    }
    else{
        users.findByUsername(username)
        .then(user => {
            // console.log('user', user)
            if (user && bcrypt.compareSync(password, user.password)){
                var token = jwt.sign(user, secret)
                res.status(200).json({
                    // username,
                    // password,
                    token,
                    is_admin: user.is_admin
                })
            }
            else{
                res.status(400).json({ msg: 'username or password didn\'t match' })
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("jwt")
})

router.use(authenticate)
router.use(authorize)

router.get('/', (req, res) => {
    users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: "Unable to retrieve users"})
    })
})

// router.use(authenticate)
// router.use(authorize)

router.get('/:username', (req, res) => {
    const {username} = req.params
    users.findByUsername(username)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: "Unable to retrieve user"})
    })
})

module.exports = router