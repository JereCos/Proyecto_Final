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

//clase constructora de usuario
class usuario{
    constructor(nombre, password, permisos){
        this.nombre = nombre.toUpperCase();
        this.password = password;
        this.permisos = permisos;
    }
}

//clase constructora de productos
class producto{
    constructor(nombre, precio, descuento, vendido){
        this.nombre = nombre.toUpperCase();
        this.precio = precio;
        this.descuento = descuento;
        this.vendido = vendido;
    }
}

//Función agregar producto
function crearProducto(nombre, precio, descuento, vendido){
    return new producto (nombre, precio, descuento, vendido);
} 

//función compra producto
const comprarProducto = (nombreProducto, precio, descuento) => {
    precioTotal += precio*descuento;
    console.log("El parcial es " + precioTotal);
    return (nombreProducto + " comprado/a");
}

//Función agregar productos al array productos
const agregarProductos = (producto) => productos.push(producto);

//función para compra
function comprar (descuento){
    do{
        opcion = prompt("Seleccione un producto:\n\n1- Carpintería\n2- Almacen\n3- Bazar\n4- Farmacia\n5- Ferretería\no escriba CANCELAR para cancelar la compra. Escriba FINALIZAR para finalizar la compra")
        if(opcion == "CANCELAR"){
            alert ("Compra cancelada")
            console.log("Compra cancelada");
            compraFinalizada = false;
        }else{  
            switch (opcion){
                case "1":
                    console.log(comprarProducto("Madera", 100, descuento));
                    agregarProductos(crearProducto("Madera", 100, descuento, true));
                    compraFinalizada = true;
                break;
                case "2":
                    console.log(comprarProducto("Arroz", 10, descuento));
                    agregarProductos(crearProducto("Arroz", 10, descuento, true));
                    compraFinalizada = true;
                break;
                case "3":
                    console.log(comprarProducto("Sillón", 1000, descuento));
                    agregarProductos(crearProducto("Sillón", 1000, descuento, true));
                    compraFinalizada = true;
                break;
                case "4":
                    console.log(comprarProducto("Migral", 150, descuento));
                    agregarProductos(crearProducto("Migral", 150, descuento, true));
                    compraFinalizada = true;
                break;
                case "5":
                    console.log(comprarProducto("Foco", 50, descuento));
                    agregarProductos(crearProducto("Foco", 50, descuento, true));
                    compraFinalizada = true;
                break;
                case "FINALIZAR":
                    compraFinalizada = false;
                break;
                default:
                break;
            }cantidadProductos += 1;
        } 
    }while(compraFinalizada);
}

//Función saludar usuario
const saludarUsuario = (nombre) => alert("Bienvenida/o " + nombre);

//Función agregar usuario
const agregarUsuario = (usuario) => usuarios.push(usuario);

//Función agregar usuario a arreglo de nombresUsuario
const agregarNombresUsuario = (nombre) => nombresUsuario.push(nombre);

//Función agregar contraseña a arreglo passwordsUsuario
const agregarPasswordsUsuario = (password) => passwordsUsuario.push(password);

//-----------------------------------------------------COMIENZO DE MAIN-----------------------------------------------------//

//Generación de usuario
while (finalizar){
    finalizarNewUsuario = prompt("Desea agregar un nuevo usuario?\n- SI\n- NO")
    if (finalizarNewUsuario == "SI"){
        nombreUsuario = prompt("Por favor ingrese nuevo nombre de usuario (máximo 4 usuarios nuevos)");
        do{
            passwordUsuario = parseInt(prompt("Por favor ingrese nueva clave numérica para usuario"));
            passwordCorrecto = isNaN(passwordUsuario);
        }while(passwordCorrecto)
        do{
            permisosUsuario = prompt("Ingrese los permisos que va a tener este usuario\n - TOTAL\n - PARCIAL")
            if(permisosUsuario == "TOTAL"){
                permisoCorrecto = false;
            }else if(permisosUsuario == "PARCIAL"){
                permisoCorrecto = false;
            }else{
                permisoCorrecto = true;
            }
        }while(permisoCorrecto)
    const usuarioNuevo = new usuario(nombreUsuario, passwordUsuario, permisosUsuario);
    agregarUsuario(usuarioNuevo);
    }else if (finalizarNewUsuario == "NO"){
        finalizar = false;
    }else{
        finalizar = true;
    }
}

console.log(usuarios);
for (const iterator of usuarios) {
    agregarNombresUsuario(iterator.nombre);
}
for (const iterator of usuarios) {
    agregarPasswordsUsuario(iterator.password);
}

console.log(nombresUsuario);
console.log(passwordsUsuario);

//Login de usuario creado
for (let i = 0; i < limitRetry; i++) {
    let usuarioName = prompt("Ingrese usuario").toUpperCase();
    let contrasenia = parseInt(prompt("Ingrese contraseña"));
    if ((usuarioName == nombresUsuario[0] || usuarioName == nombresUsuario[1] || usuarioName == nombresUsuario[2] || usuarioName == nombresUsuario[3]) && (contrasenia == passwordsUsuario[0] || contrasenia == passwordsUsuario[1] || usuarioName == nombresUsuario[2]  || usuarioName == nombresUsuario[3])){
        saludarUsuario(usuarioName);
        i = 10;
        flagLogueo = true;
    }else{
        alert ("Usuario incorrecto");
        flagLogueo = false;
    }
}

//Control de login
if (flagLogueo == true){
    alert("Login exitoso")
    console.log("Login exitoso");
    //Compra de producto con permisos TOTAL o PARCIAL
    if(permisosUsuario == "TOTAL"){
        comprar(0.5);
    }else{
        comprar(1.00);     
    }
//Carga de nombres al array productosNombre
    for (const iterator of productos) {
        productosNombre.push(iterator.nombre);
    }

//Separación de items en array productosNombre por ','
productosNombre.join(", ");

    //Finalizar compra por FINALIZAR o por CANCELAR
    if (opcion != "CANCELAR"){
        alert("El total de la compra es $" + precioTotal + " por la compra de " + cantidadProductos + " productos.");
        console.log("El total de la compra es $" + precioTotal + " por la compra de " + cantidadProductos + " productos.");
        console.log(productos);
        console.log(productosNombre); 
        alert("Los productos comprados son " + productosNombre)
        console.log("Los productos comprados son " + productosNombre); 
    }else{
        alert("La compra fue cancelada.");
        console.error("La compra fue cancelada.");
        productos = [];
        console.log(productos);
        console.log("Los productos retirados del carrito son " + productosNombre); 
    }    
}else{
    alert("Falla en el login");
    console.error("Falla en el login");
}