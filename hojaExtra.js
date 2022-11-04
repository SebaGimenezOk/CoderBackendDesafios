const Contenedor = require('./desafio2')

const Stock = new Contenedor('./productos.txt')

const newProducto = async () => {
    try {
        
            await Stock.save({
                title: "sardo",
                price: 1200,
                thumbnail: "sardo.png"
            })
            await Stock.save({
                title: "cremoso",
                price: 1100,
                thumbnail: "cemoso.png"
            })
            await Stock.save({
                title: "ralladito",
                price: 500,
                thumbnail: "ralladito.png"
            })

        }catch (error) {
            console.log(error);
        }
    }


module.exports = Stock