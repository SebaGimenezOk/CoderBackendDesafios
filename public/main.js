
const socket = io();

let productos = []
let messages = [];


const updateProductos = (data) => {
    productosDelHtml = ''
    
    data.forEach(i => {
        productosDelHtml = productosDelHtml + `<tr><td>${i.id}</td><td>${i.title}</td><td>${i.price}</td></tr>`
    });
    document.querySelector(".tableBody").innerHTML = productosDelHtml
}


const updateMessages = (data) => {
    messageToHtml = ''
    data.forEach(i => {
        messageToHtml = messageToHtml + `<li><span class="correo"><b>${i.email}</b></span> <span class="timeStamp">[${i.timeStamp}]</span>: <span class="message">${i.message}</span></li>`
    })
    document.querySelector("#messagesList").innerHTML = messageToHtml
}





socket.on('update data', data => {
   
    productos = data.productos
    messages = data.messages
    updateProductos(productos)
    updateMessages(messages)
})

const sendNewProduct = () => {
    const title = document.querySelector("#title").value
    const thumbnail = document.querySelector("#thumbnail").value
    const price = document.querySelector("#price").value

    if (!title || !thumbnail || !price) {
        alert("complete con  datos")
        return
    }
    const nuevoProducto = {
        title, thumbnail, price
    }
    socket.emit('nuevo producto servidor', nuevoProducto)
    document.querySelector("#title").value = '';
    document.querySelector("#thumbnail").value = '';
    document.querySelector("#price").value = '';

}
socket.on('nuevo producto servidor', data => {
    updateProductos(data)
})
socket.on('update mensajes', data => {
    messages = data;
    updateMessages(messages)
})



const sendNewMessage = () => {

    const timeStamp = new Date().toLocaleString()
    const email = document.querySelector("#userEmail").value
    const message = document.querySelector("#mensaje").value
    if (!email || !message) {
        alert("error")
        return
    }
    const messageObjeto = {
        timeStamp,
        email,
        message
    }
    socket.emit('nuevo mensaje servidor', messageObjeto)
    document.querySelector("#mensaje").value = ''

}
socket.on('nuevo mensaje servidor', data => {
    messages.push(data)
    updateMessages(messages)
})