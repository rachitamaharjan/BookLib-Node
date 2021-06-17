var fs = require('fs');
var express = require('express');
// var bcrypt = require('bcryptjs');
const app = express()
const http = require('http')
const router = require('./router')
var cors = require('cors')
const httpStatus = require('http-status-codes');


app.use(cors())

app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use('/api', router)

app.use((err, req, res, next) => {
    res.status(500).json({error: err.message})
})

app.use((err, req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
        }
    })
})

app.use((err, req, res, next) => {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
        }
    })
})

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            code: err.status,
            message: HttpStatus.getStatusText(err.status)
        }
    })
})

app.use((err, req, res, next) => {
    const error = buildError(err);
    res.status(error.code).json({ error });
})



app.listen(3000, () => {
    console.log('Server Starting at Port 3000')
})


