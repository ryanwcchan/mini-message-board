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

server.use(express.urlencoded({ extended: true }));

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

let messages = []
let messageIdCounter = 1;

// Index route
server.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
    // res.sendFile('./views/index.ejs', { root: __dirname })
})

server.get('/new', (req, res) => {
    res.render('create')
})

server.post('/new', (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    const id = messageIdCounter++

    messages.push({ text: message, user: name, added: new Date(), id: id });
    console.log(`Author ${name}`)
    console.log(`Message: ${message}`)

    res.redirect('/messages')
})



server.get('/messages', (req, res) => {
    res.render('messages', { messages: messages.slice().reverse() })
})

server.get('/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10)
    const message = messages.find(msg => msg.id === messageId)

    if(message) {
        res.render('messageInfo', { message })
    } else {
        res.status(404).send('Message not found')
    }
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