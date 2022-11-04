const express = require('express');
const productosRouter= require('./products/products.router')
const router = express.Router()
const Contenedor=require('../../desafio2')

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        health: 'Up',
        environment: process.env.ENVIRONMENT || 'not found'
    })
})
.use('/productos', productosRouter)

module.exports = router;