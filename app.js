const express = require('express')
require('dotenv').config();
const indexRouter = require('./SRC/routes/index')
const Stock = require('./hojaExtra');
const app = express();
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');

const http = new HttpServer(app);
const io = new IoServer(http);



app.use(express.static(__dirname + '/public'))

app.use('/api',indexRouter)

app.get('/', (_req, res) => {
    res.sendFile('index', { root: __dirname })
})


// app.get('/productos', async (_req, res) => {
//     const productos = await Stock.getAll()
//     res.render('pages/hojaProductos', { productos: productos })
// })
// app.get('/hojaProductos', (_req, res) => {
//     res.redirect('/')
// })

// app.post('/productos', (req, res) => {
//     const { title, thumbnail, price } = req.body
//     Stock.save({ title, thumbnail, price })
//     res.redirect('/')
// })

app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'up'
    })
});
const messages = []


io.on('connection', async (socket) => {
    console.info("nuevo ususario conectado")
    socket.on('nuevo mensaje servidor', data => {
        messages.push(data)
        io.sockets.emit('nuevo mensaje servidor', data)
    })
    const productos = await Stock.getAll()
    socket.emit('update data', { productos, messages })
    socket.on('nuevo mensaje servidor', async (data) => {
    
        await Stock.save(data)
        nuevosProductos = await Stock.getAll()
        io.sockets.emit('nuevo mensaje servidor', nuevosProductos)
    })
})



module.exports = http