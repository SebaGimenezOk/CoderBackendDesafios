const fs = require('fs')

class Contenedor {
  constructor(name) {
    this.name = name
  }
  save(producto) {
    const productos = fs.readFileSync(this.name, 'utf-8')
    const parsedProductos = JSON.parse(productos)

    let idMaximo = 0

    if (parsedProductos.length == 0) {
      Object.assign(producto, {
        id: 1
      })
      parsedProductos.push(producto)
      fs.writeFileSync(this.name, JSON.stringify(parsedProductos, null, 2))
      return 1
    } else {
      parsedProductos.forEach(i => {
        if (i.id > idMaximo) {
          idMaximo = i.id
        }
      })
      Object.assign(producto, {
        id: idMaximo + 1
      })
      parsedProductos.push(producto)
      fs.writeFileSync(this.name, JSON.stringify(parsedProductos, null, 2))
      return (idMaximo + 1)

    }
  }
  async getByID(id) {
    try {
      const data = await fs.promises.readFile(this.name, "utf-8")
      const jsonData = JSON.parse(data)
      const elementofiltrado = jsonData.find(item => item.id == id)
      if (elementofiltrado == undefined) {
        return null
      } else {
        return elementofiltrado
      }
    } catch (error) {
      throw new Error(error)
    }
  }
async getRandom(){
    try {
      const data=await fs.promises.readFile(this.name, 'utf-8')
      const jsonData=json.parse(data)
      let randomProduct=parseInt(Math.random()*(jsonData.length -1))
      return jsonData[randomProduct]

    } catch (error) {
      console.log(error);
    }
}

async putById(id, obj){
  try {
    const data=await fs.promises.readFile(this.name,"utf-8");
    const jsonData=JSON.parse(data)
    const product = jsonData.find(i=>i.id==id)
    const prodModificad = {...product, ...obj}
    const products = jsonData.filter(i=>i.id!=id)
          products.push(prodModificad)
           await fs.promises.writeFile(this.name,JSON.stringify(products,null,2))
return jsonData
  } catch (error) {
     throw new error
  }
}



  async getAll() {
    try {
      const data = await fs.promises.readFile(this.name, "utf-8")
      const jsonData = JSON.parse(data)
      return jsonData
    } catch (error) {
      throw new Error(error)
    }
  }
  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(this.name, "utf-8")
      const jsonData = JSON.parse(data)
      const borrado=jsonData.find(i=i.id==id)
      const filtraproducts=jsonData.filter(i=>i.id!==id)
      await fs.promises.writeFile(this.name, json.stringify(filtraproducts, null, 2))
    } catch (error) {
      throw new Error(error)
    }
  }


  async deleteAll() {
    try {
      const arrayVacio = []
      await fs.promises.writeFile(this.name, JSON.stringify(arrayVacio, null, 2))

    } catch (error) {
      throw new Error
    }
  }
}



const container = new Contenedor('productos.txt')

console.log(container.save({
  title: "Holanda",
  price: 1400,
  thumbnail: 'https://cd3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}))
console.log(container.save({
  title: "Reggiano",
  price: 1900,
  thumbnail: 'https://cd3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}))
console.log(container.save({
  title: "Provolone",
  price: 1600,
  thumbnail: 'https://cd3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}));


module.exports= Contenedor




// const Simulador = {
//   title: "(nombre de prod)",
//   price: "(precio)",
//   thumbnail: "(url de la img del prod)"
// }



// const leer = async () => {
//     try {
//       const txtData = await fs.promises.readFile('./productosDesafio2.txt', 'utf-8')
//       console.log(txtData);
//     } catch {
//       throw new Error(error)
//     }
//   }
// leer()

