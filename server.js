// const http = require('http');
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     console.log(req.url)

//     // set header content type
//     res.setHeader('Content-Type', 'text/html');

//     fs.readFile('./views/index.ejs', (err, data) => {
//         if (err) {
//             console.log(err)
//             res.end()
//         } else {
//             // res.write(data);
//             res.end(data)
//         }
//     })
// })

// server.listen(3000, () => {
//     console.log('Listening on port 3000')
// })

const express = require('express')
const server = express()
const PORT = 3000

server.set('view engine', 'ejs')

// server.use(express.urlencoded({ extended: true }))

// Index route
server.get('/', (req, res) => {
    res.render('index')
})

server.listen(PORT, () => {
    console.log(`Server is runnong on port ${PORT}`)
})