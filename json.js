let nombreProducto = "Samsung s20+"
let precioProducto = 500000
let stock = 4
const impuestoIva = 1.21
let cantidad = parseInt(prompt("Cuantos" + nombreProducto+ "quieres comprar?"))

while (isNaN (cantidad) || cantidad <= 0){
    alert("Por favor ingresa una cantidad valida");
    cantidad = parseInt(prompt("Cuantas unidades de "+ nombreProducto + " quieres comprar"))
}

if (cantidad > stock) {
    alert("Lo sentimos, no tenemos los suficientes")
}else {

    let aplicarIva = confirm("¿Deseas aplicar IVA?");
    let precioConIva = aplicarIva ? precioProducto * impuestoIva : precioProducto;
    let total = precioConIva * cantidad;
        alert(" Total a pagar por " + cantidad + " unidades; $ " + total)
}
console.log ("Producto:" + nombreProducto);
console.log ("Precio sin iva:" + precioProducto);
console.log ("Precio con iva:" + precioConIva);
console.log ("Total a pagar:" + total)
