var fs = require('fs');
var express = require('express');
// var bcrypt = require('bcryptjs');
const app = express()
const http = require('http')
const router = require('./router')

app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use('/api', router)


// app.use('/api', (req, res) => {
//     res.json({
//         msg: 'h'
//     })
// })

// router.get('/ok',(req, res) => {
//     res.json({
//         msg: 'hoooo'
//     })
//     console.log('heyy')
// })
// app.use((req, res, next) => {
//     console.log('index next')
//     next()
// })

app.listen(3000, () => {
    console.log('Server Starting at Port 3000')
})


// filename1 = "lf.txt"
// filename2 = "mood.txt"

// fs.appendFile(filename1, 'Leapfrog!', function (err) {
//     if (err) throw err;
//     console.log(`Updated ${filename2}!`);
// });

// fs.writeFile(filename2, 'Happy, Calm, Mixed, Confused, Supercalifragilisticexpialidocious', function (err) {
//     if (err) throw err;
//     console.log(`Written on ${filename2}!`);
// });

// fs.readFile(filename1, function (err, data) {
//     if (err) throw err;
//     console.log(`Inside ${filename1}: ${data}`);
// });

// fs.readFile(filename2, function (err, data) {
//     if (err) throw err;
//     console.log(`Inside ${filename2}: ${data}`);
// });

// fs.unlink(filename1, function (err) {
//     if (err) throw err;
//     console.log(`Deleted ${filename1}`);
//   });

