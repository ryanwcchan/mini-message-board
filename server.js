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
const path = require('path')
const browserSync = require('browser-sync').create()

const server = express()
const PORT = 3000

server.use(express.static(path.join(__dirname, 'public')))

server.set('view engine', 'ejs')

// server.use(express.urlencoded({ extended: true }))

// server.use((req, res, next) => {
//     console.log('new request made:')
//     console.log('hostname: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next();
// })

// Index route
server.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
    // res.sendFile('./views/index.ejs', { root: __dirname })
})

server.get('/create-message', (req, res) => {
    res.render('create')
})

server.get('/messages', (req, res) => {
    const messages = [
        {
            text: "Hi there!",
            user: "Amando",
            added: new Date()
        },
        {
            text: "Hello World!",
            user: "Charles",
            added: new Date()
        }
    ];

    res.render('messages', { messages })
})

// redirects
// server.get('/redirect-1', (req, res) => {
//     res.redirect('/redirect-2')
// })

// 404 page
server.use((req, res) => {
    res.status(404).render('404', { root: __dirname })
})

server.listen(PORT, () => {
    console.log(`Server is runnong on port ${PORT}`)
})

browserSync.init({
    proxy: `http://localhost:${PORT}`,
    files: ['./views/**/*.ejs', './public/**/*'],
    open: false,
    notify: false,
})