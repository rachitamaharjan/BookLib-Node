const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const authenticate = (req, res, next) => {
    let token
    if(req.headers.authorization){
        token = req.headers.authorization
    }

    if(!token){
        res.sendStatus(401)
    }else{
        jwt.verify(token, secret, (err, decoded) => {
            if(err) throw err
            console.log('decoded', decoded)
            const {role} = decoded
            req.user = {role}
            next()
        })
    }
}

module.exports = authenticate