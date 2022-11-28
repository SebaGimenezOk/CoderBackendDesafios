require("dotenv").config();
const express = require("express");
const indexRouter = require("./src/routes/index");
const Stock = require("./Stock");
const _ = require('lodash')
const logger = require('morgan');
const errorHandler = require('./src/middlewares/errorHandler');


const app = express();
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger, ('dev'))


const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.static(__dirname + "/public"));
app.use('/api', indexRouter);
app.use(errorHandler)


app.get('/', async (_req, res) => {
    const productos = await Stock.getAll()
    res.render('pages/index', { productos })
})



app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || "undefined",
        health: "up",
    });
});
const messages = [];

io.on("connection", async (socket) => {
    console.info("nuevo ususario conectado");
    const productos = await Stock.getAll();
    socket.emit("update data", { productos, messages });
    socket.on("nuevo mensaje servidor", async (data) => {
        await Stock.save(data);
        nuevoProducto = await Stock.getAll();
        io.sockets.emit("nuevo mensaje servidor", nuevoProducto);
    });

    socket.on('nuevo_producto', async newProducto => {
        await Stock.save(newProducto)
        const productos = await Stock.getAll();
        io.sockets.emit('update_products', productos)
    })



    socket.on("nuevo mensaje servidor", (data) => {
        messages.push(data);
        io.sockets.emit("nuevo mensaje servidor", data);
    });
});



module.exports = app;
