const express = require('express')
const router = express.Router();
const Stock = require('../../../Stock')
const fs = require('fs')
const _ = require('lodash');
const Products = require('../../services/database/products/products.knex')
const productService = new Products();



router.get('/', async (_req, res) => {
    try {
        const newProducts = await Stock.getAll()
        res.status(200).send(newProducts)
    } catch (error) {
        console.log(error);
    }
})

router.get('/random', async (_req, res) => {
    try {
        const randomProduct = await Stock.getRandom()
        res.status(200).send(randomProduct)

    } catch (error) {
        console.log(error);
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const selected = await Stock.getByID(id)
        if (selected) {
            res.status(200).json(selected)
        }
        else {
            res.status(500).json({
                error: "no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "no encontrado"
        })
    }
})

router.post('/', async (req, res, next) => {
    const { body } = req
    try {
        await Stock.save(body)
        const productos = await Stock.getAll()
        const newProduct = productos[(productos.length) - 1]
        res.status(200).json(newProduct)
    }
    catch (error) {
        next(err)
    }
})
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        let prodModificad = await Stock.putById(id, body)
        res.status(200).json(prodModificad)
    } catch (error) {

    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    let borrado = await Stock.deleteById(id)
    if (borrado) {
        res.status(200).json({
            response: deleted
        })
    } else {
        res.status(404).json({
            error: "object no found"
        })
    }
    router.post('/', async (req, res, next) => {
        const { body } = req;
        if (_.isNil(body)) {
            return res.status(400).json({
                success: false,
                message: 'bad request'
            })
        }
        try {
            const data = await productService.createProduct(body);
            if (!data.success) {
                return res.status(400).json(data)
            }
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    })
    
    router.get('/:productCode', async (req, res) => {
        const { productCode } = req.params;
        if (_.isNil(productCode)) {
            return res.status(400).json({
                succes: false,
                message: 'Bad request!'
            });
        }
        try {
            const data = await productService.getProduct(productCode);
            if (!data.success) {
                return res.status(400).json(data)
            }
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    })
    

})

module.exports = router