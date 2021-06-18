const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const authenticate = (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        res.sendStatus(401)

    }else{
        jwt.verify(token, secret, (err, decoded) => {
            if(err) throw err
            // console.log('decoded', decoded)
            const {is_admin, id} = decoded
            req.user = {is_admin, id}
            user_id = req.user.id                      
            next()
        })
    }
}

module.exports = authenticate