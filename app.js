const express = require('express')
require('dotenv').config();
const indexRouter = require('./SRC/routes/index')
const Stock = require('./hojaExtra')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');




app.get('/', (_req, res) => {
    res.render('pages/index')
})



    app.get('/productos',async(_req,res)=>{
        const productos = await Stock.getAll()
        res.render('pages/hojaProductos', {productos:productos})
    })
    app.get('/hojaProductos',(_req,res)=>{
        res.redirect('/')
    })

    app.post('/productos',(req,res)=>{
        const { title, thumbnail, price}= req.body
        Stock.save({title, thumbnail, price})
        res.redirect('/')})

        
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'up'
    })
});


module.exports = app