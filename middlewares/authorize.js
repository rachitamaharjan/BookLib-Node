const authorize = (req, res, next) => {
    if(req.user && req.user.is_admin === 1){
        next()
    }
    else{
        res.sendStatus(403)
    }
}

module.exports = authorize