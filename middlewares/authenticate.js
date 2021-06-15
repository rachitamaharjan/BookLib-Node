const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const authenticate = (req, res, next) => {
    let token
    if(req.headers.authorization){
        token = req.headers.authorization
    }

    if(!token){
        res.sendStatus(401)
        console.log('not inside')

    }else{
        console.log('inside')
        jwt.verify(token, secret, (err, decoded) => {
            if(err) throw err
            console.log('decoded', decoded)
            const {is_admin} = decoded
            req.user = {is_admin}
            next()
        })
    }
}

module.exports = authenticate