const knexConfig = require('../config');
const knex = require('knex');
const { v4: uuidv4 } = require('uuid');


class Products {
    constructor() {
        this.knex = knex(knexConfig)
    }

    async createProduct(product) {
        Object.assign(product, {
            code: uuidv4()
        })
        return new Promise((resolve, reject) => {
            this.knex('products').insert(product).then(() => {
                resolve({
                    success: true,
                    data: product
                });
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.knex.destroy();
            });
        })
    }

    async getProduct(productCode) {
        try {
            const data = await this.knex('products').where('code', '=', productCode).select('*');
            if (data.length == 0) {
                return {
                    success: false,
                    message: 'Product not found'
                }
            }
            const productFormatted = JSON.parse(JSON.stringify(data[0]));
            return {
                success: true,
                data: productFormatted
            }

        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

}

module.exports = Products;

