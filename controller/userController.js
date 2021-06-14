const express = require('express')
// const app = express()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var {secret} = require('../config')

const router = express.Router()
// const books = require('../models/bookmodel')
const users = require('../models/usermodel')

function hashPassword(password) {

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
    // .then( pass => {
    //     return pass
    // })
    // return 
    // , function(err, hash) {
    //     if (err) reject(err)
    //     resolve(hash)
    //   });
  
    // return hashedPassword
  }




router.post('/register', (req, res) => {
    const credentials = req.body
    let {username, email, password, is_admin} = credentials

    if(!(username && email && password && is_admin)){
        return res.status(400).json({message: "One or more required fields empty"})
    }
    else{
        const SALT_ROUNDS = 10
        password = bcrypt.hash(password, SALT_ROUNDS)
        .then(password => {
            users.add({username, email, password, is_admin})
        .then(user => {
            console.log('password',password)
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

router.post('/login', (req, res) => {
    console.log('register',req.body)
    const {email,  password } = req.body
    const dbHash = '$2a$10$ATzT5wuhoPtXnNEuRRq3g.tYk.jyRjskPQAFLfu1Duucj1LnECjD.'

    bcrypt.compare(password, dbHash, function(err, pass) {
        if (err){
            res.json({ error: String(err) })
        }
        else if (pass){

            const userDetail = {
                name: "yes",
                email: "e",
                role: "adminm"
            }

            var token = jwt.sign(userDetail, secret )

            res.json({
                email,
                password,
                token
            })
        }
        else{
            res.json({ msg: 'email or password didn\'t match' })
        }
    });
    
})

module.exports = router