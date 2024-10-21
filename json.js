// Agregamos más productos al simulador
let productos = [
    { nombre: "Samsung S20+", precio: 500000, stock: 4 },
    { nombre: "iPhone 12", precio: 600000, stock: 2 },
    { nombre: "Xiaomi Mi 11", precio: 450000, stock: 5 }
];
const impuestoIva = 1.21;

function seleccionarProducto() {
    let opciones = "Elige un producto:\n";
    for (let i = 0; i < productos.length; i++) {
        opciones += i + 1 + ". " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    let seleccion = parseInt(prompt(opciones));
    return productos[seleccion - 1];
}

function calcularTotal(precio, cantidad, aplicarIva) {
    let precioConIva = aplicarIva ? precio * impuestoIva : precio;
    return precioConIva * cantidad;
}

function comprarProducto() {
    let totalCompra = 0;
    let seguirComprando = true;

    while (seguirComprando) {
        let productoSeleccionado = seleccionarProducto();

        let cantidad = parseInt(prompt("¿Cuántos " + productoSeleccionado.nombre + " quieres comprar?"));

        while (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingresa una cantidad válida.");
            cantidad = parseInt(prompt("¿Cuántas unidades de " + productoSeleccionado.nombre + " quieres comprar?"));
        }

        if (cantidad > productoSeleccionado.stock) {
            alert("Lo sentimos, no tenemos suficientes productos en stock.");
        } else {
            let aplicarIva = confirm("¿Deseas aplicar IVA?");
            let total = calcularTotal(productoSeleccionado.precio, cantidad, aplicarIva);
            totalCompra += total;
            alert("Total a pagar por " + cantidad + " unidades de " + productoSeleccionado.nombre + ": $" + total);
        }

        seguirComprando = confirm("¿Deseas comprar otro producto?");
    }

    alert("El total de tu compra es: $" + totalCompra);
}

comprarProducto();
