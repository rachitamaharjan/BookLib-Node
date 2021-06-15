const express = require('express')
// const app = express()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var {secret} = require('../config')

const router = express.Router()
// const books = require('../models/bookmodel')
const users = require('../models/usermodel')

// function hashPassword(password) {

//     const saltRounds = 10;
//     bcrypt.hash(password, saltRounds)
//     // .then( pass => {
//     //     return pass
//     // })
//     // return 
//     // , function(err, hash) {
//     //     if (err) reject(err)
//     //     resolve(hash)
//     //   });
  
//     // return hashedPassword
//   }




router.post('/register', (req, res) => {
    const credentials = req.body
    let {username, email, password, is_admin} = credentials

    if(!(username && email && password && is_admin)){
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

router.get('/', (req, res) => {
    users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: "Unable to retrieve users"})
    })
})

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

router.post('/login', (req, res) => {
    console.log('register',req.body)
    const {username,  password } = req.body
    // const dbHash = '$2a$10$ATzT5wuhoPtXnNEuRRq3g.tYk.jyRjskPQAFLfu1Duucj1LnECjD.'
    if(!(username && password)){
        return res.status(400).json({message: "One or more required fields empty"})
    }
    else{
        users.findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                var token = jwt.sign(user, secret)
                res.status(200).json({
                    username,
                    password,
                    token
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

module.exports = router