const productos = [
    { nombre: "Samsung S20+", precio: 500000, stock: 4 },
    { nombre: "iPhone 13", precio: 800000, stock: 3 },
    { nombre: "Xiaomi Mi 11", precio: 300000, stock: 5 },
    { nombre: "Motorola G9", precio: 200000, stock: 10 }
];

const impuestoIva = 1.21;
const productoSelect = document.getElementById("productoSelect");
const cantidadInput = document.getElementById("cantidadInput");
const ivaCheckbox = document.getElementById("ivaCheckbox");
const resultadoDiv = document.getElementById("resultado");
const comprarBtn = document.getElementById("comprarBtn");
const historialList = document.getElementById("historialList");

// Cargar el historial de compras desde localStorage al cargar la página
let historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];

// Rellenar el select con los productos
productos.forEach((producto, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = producto.nombre;
    productoSelect.appendChild(option);
});

function calcularTotal(precio, cantidad, aplicarIva) {
    const precioConIva = aplicarIva ? precio * impuestoIva : precio;
    return precioConIva * cantidad;
}

// Función para renderizar el historial de compras en el HTML
function renderizarHistorial() {
    historialList.innerHTML = ""; // Limpiar lista previa

    historialCompras.forEach(compra => {
        const listItem = document.createElement("li");
        listItem.textContent = `Producto: ${compra.nombre}, Cantidad: ${compra.cantidad}, Total: $${compra.total}, Fecha: ${compra.fecha}`;
        historialList.appendChild(listItem);
    });
}

// Llamar a renderizarHistorial al cargar la página para mostrar el historial guardado
renderizarHistorial();

// Evento de compra
comprarBtn.addEventListener("click", () => {
    const productoIndex = productoSelect.value;
    const cantidad = parseInt(cantidadInput.value);
    const aplicarIva = ivaCheckbox.checked; // Usar el valor del checkbox para aplicar IVA

    // Validaciones
    if (productoIndex === "" || isNaN(cantidad) || cantidad <= 0) {
        resultadoDiv.textContent = "Por favor, selecciona un producto y una cantidad válida.";
        return;
    }

    const producto = productos[productoIndex];

    if (cantidad > producto.stock) {
        resultadoDiv.textContent = "Lo sentimos, no tenemos el stock suficiente.";
    } else {
        const total = calcularTotal(producto.precio, cantidad, aplicarIva);
        resultadoDiv.textContent = `Total a pagar por ${cantidad} unidades de ${producto.nombre}: $${total.toFixed(2)}`;
        
        // Guardar la compra en el historial y en localStorage
        const compra = {
            nombre: producto.nombre,
            cantidad: cantidad,
            total: total.toFixed(2),
            fecha: new Date().toLocaleString()
        };
        historialCompras.push(compra);
        localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
        
        // Renderizar el historial actualizado en el HTML
        renderizarHistorial();
    }
});
