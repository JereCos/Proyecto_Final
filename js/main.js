/*JS que simula la creación de usuario, login y posterior compra. Si el permiso que se le otorga al usuario es TOTAL tendrá mejores descuentos.*/

//Declaración de variables globales
let limitRetry = 3;
let flagLogueo = true;
let precioTotal = 0;
let opcion;
let compra;
let compraFinalizada = true;
let cantidadProductos = 0;
let nombreUsuario;
let passwordUsuario;
let permisosUsuario;
let passwordCorrecto = true;
let permisoCorrecto = true;
let usuarios = [];
let productos = [];
let finalizar = true;
let nombresUsuario = [];
let passwordsUsuario = [];
let productosNombre = [];


//DOM
const tarjeta = document.querySelector("#tarjeta");
const finalizaCompra = document.querySelector("#finalizar")

/*----------------------------------------Constructor y funciones para agregar e interactuar con usuarios---------------------------------------*/
//clase constructora de usuario
class Usuario{
    constructor(nombre, password, permisos){
        this.nombre = nombre.toUpperCase();
        this.password = password;
        this.permisos = permisos;
    }
}

//Función saludar usuario
const saludarUsuario = (nombre) => console.log("Bienvenida/o " + nombre);

//Función agregar usuario
const agregarUsuario = (usuario) => usuarios.push(usuario);

//Función agregar usuario a arreglo de nombresUsuario
const agregarNombresUsuario = (nombre) => nombresUsuario.push(nombre);

//Función agregar contraseña a arreglo passwordsUsuario
const agregarPasswordsUsuario = (password) => passwordsUsuario.push(password);

/*----------------------------------------Constructor y funciones para agregar productos al catalogo--------------------------------------------*/
//clase constructora de productos
class Producto{
    constructor(nombre, precio, descuento, vendido){
        this.nombre = nombre.toUpperCase();
        this.precio = precio;
        this.descuento = descuento;
        this.vendido = vendido;
    }
}

//Función agregar producto
function crearProducto(nombre, precio, descuento, vendido){
    return new Producto (nombre, precio, descuento, vendido);
} 

//Función agregar productos al array productos
const agregarProductos = (producto) => productos.push(producto);

//función compra producto
const comprarProducto = (nombreProducto, precio, id) => {
    precioTotal += precio;
    console.log("El parcial es " + precioTotal);
    return (nombreProducto + " agregado al carrito");
}

//función para agregar producto comprado al array nombreProductos
function finalizarCompra (){
    console.log("El total de su compra es " + precioTotal);
    precioTotal = 0;
}

//Función para crear tarjeta de producto
function crearTarjetaProducto (producto){

    let tarjetaHtml;
       
        tarjetaHtml = `
            <div class="row">
                <div class="col s12 m7">
                <div class="card">
                    <div class="card-image">
                    <img src=${producto.img}>
                    </div>
                    <div>
                    <span class="card-title">${producto.nombreProducto}</span>
                    </div>
                    <div class="card-content">
                    <p>$${producto.precio}</p>
                    </div>
                    <div class="card-action">
                    <button id="btnComprar" class="waves-effect waves-light btn" type="submit">Comprar</button>
                    </div>
                </div>
                </div>
            </div>
        `
    tarjeta.innerHTML += tarjetaHtml;

}

//----------------------------------------------------COMIENZO DE MAIN-----------------------------------------------------//
//Productos hardcodeados
productos = [
        {id: 1, nombreProducto: "Arroz", precio: 100, img: "./img/almacen1.png"},
        {id: 2, nombreProducto: "Azúcar", precio: 70, img: "./img/almacen2.jpg"},
        {id: 3, nombreProducto: "Pan", precio: 120, img: "./img/almacen3.png"},
        {id: 4, nombreProducto: "Queso Cremoso", precio: 200, img: "./img/almacen4.jpg"},
        {id: 5, nombreProducto: "Dulce de leche", precio: 250, img: "./img/almacen1.png"},
        {id: 6, nombreProducto: "Galletas", precio: 150, img: "./img/almacen2.jpg"},
        {id: 7, nombreProducto: "Mermelada", precio: 230, img: "./img/almacen3.png"},
        {id: 8, nombreProducto: "Aceite", precio: 190, img: "./img/almacen4.jpg"},
        {id: 9, nombreProducto: "Lavandina", precio: 125, img: "./img/almacen1.png"},
        {id: 10, nombreProducto: "Detergente", precio: 300, img: "./img/almacen2.jpg"},
        {id: 11, nombreProducto: "Pure de Tomate", precio: 90, img: "./img/almacen3.png"},
        {id: 12, nombreProducto: "Yerba", precio: 270, img: "./img/almacen4.jpg"},
];

console.log("Productos disponibles: " + JSON.stringify(productos));

//Crea tarjetas a partir de la cantidad de productos
for (const producto of productos) {
    crearTarjetaProducto(producto);   
}    

//Selecciona cada botón de tarjeta
const btnComprar = document.querySelectorAll(".waves-effect.waves-light.btn");

//Compra cada producto por el botón
for (let i = 0; i < btnComprar.length; i++) {
btnComprar[i].addEventListener("click", function (e){
    e.preventDefault();
    console.log(comprarProducto(productos[i].nombreProducto, productos[i].precio, productos[i].id));        
})   
}

//Crear botón finalizar compra de manera dinámica
let btnFinaliza = document.createElement("button");
let btnFinalizaToast = document.querySelector("#toast")


function showToast (){
    btnFinalizaToast.className = "show";
    setTimeout(function(){ btnFinalizaToast.className = btnFinalizaToast.className.replace("show", ""); }, 5000);
    btnFinalizaToast.textContent = "El total de su compra es " + precioTotal;
}

btnFinaliza.innerHTML = `<button id="btnfinalizar" onclick = "showToast()" class="waves-effect waves-light btn" type="submit">Finalizar compra</button>`
finalizaCompra.appendChild(btnFinaliza);

btnFinaliza.addEventListener("click", function (e) {
    e.preventDefault();
    finalizarCompra();
})