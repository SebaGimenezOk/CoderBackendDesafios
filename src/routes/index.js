const fs = require('fs')
const express = require('express');
const getEnv = require('../services/environment/env.service')
const productsRoutes=require('../routes/products/products.routes')
const router = express.Router()
const Contenedor=require('../../desafio2')

router.get('/health', async(_req, res) => {
    res.status(200).json({
        success: true,
        health: 'Up',
        environment: process.env.ENVIRONMENT || 'not found'
    })
})
.use('/products', productsRoutes)


module.exports = router;