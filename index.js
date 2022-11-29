/* constante con arreglo de objeto de productos */
const productos = [
    { name: 'polera', value: 10000 },
    { name: 'jeans', value: 30000 },
    { name: 'zapatilla', value: 50000 },
    { name: 'cinturon', value: 20000 },
    { name: 'gorro', value: 3500 }
];

/* variables globales */
let carrito = [];
let nombreCliente;

//funcion que inicia la compra de productos
const comprarProducto = () => {
    nombreCliente = prompt('Hola, por favor ingresa tu nombre');
    while (nombreCliente !== null) {
        if (nombreCliente !== '') {
            let seleccion = confirm('¡BIENVENIDO ' + nombreCliente?.toUpperCase() + '!, ¿deseas comprar algún producto?, en caso contrario selecciona CANCELAR para salir');

            if (seleccion === true) {
                seleccionarProducto();
            } else {
                nombreCliente = null;
                alert('Gracias por visitarnos, hasta pronto!!!');
            }
        } else {
            alert('Ingrese un usuario');
            comprarProducto();
        }
    }
};

/* funcion seleccionar productos */
const seleccionarProducto = () => {
    let todosLosProductos = productos.map((product) => product.name + '  -  $' + product.value + '\n');
    let seleccionaProducto = prompt('Seleccione un producto de nuestra lista \n\n' + todosLosProductos.join(''), 'ej: polera');
    do {
        if (seleccionaProducto !== '') {
            agregaProducto(seleccionaProducto);
        } else {
            alert('Debe ingresar un producto');
            seleccionarProducto();
        }
    } while (seleccionaProducto === '');
}

/* funcion agregar producto */
const agregaProducto = (seleccionaProducto) => {
    let precioProducto = 0;
    if (seleccionaProducto === 'polera' || seleccionaProducto === 'jeans' || seleccionaProducto === 'zapatilla' || seleccionaProducto === 'cinturon' || seleccionaProducto === 'gorro') {
        switch (seleccionaProducto) {
            case 'polera':
                precioProducto = 10000
                break;
            case 'jeans':
                precioProducto = 30000
                break;
            case 'zapatilla':
                precioProducto = 50000
                break;
            case 'cinturon':
                precioProducto = 20000
                break;
            case 'gorro':
                precioProducto = 3500
                break;
            default:
                alert("El dato ingresado no es correcto");
                precioProducto = 0;
                break;
        }
        let cantidadProductos = parseInt(prompt("¿Cuantas unidades desea comprar?"));
        if (!isNaN(cantidadProductos)) {
            if (cantidadProductos !== 0) {
                carrito.push({ seleccionaProducto, cantidadProductos, precioProducto });
            } else {
                alert('Debes ingresar una cantidad mayor a cero');
                agregaProducto(seleccionaProducto);
            }
        } else {
            alert('Debe ingresar unidades a comprar');
            agregaProducto(seleccionaProducto);
        }
    } else {
        alert('No contamos con el producto seleccionado');
        seleccionarProducto();
    }

    let nuevaCompra = confirm('¿Desea realizar otra compra?');
    do {
        if (nuevaCompra === false) {
            alert('Selecciona ACEPTAR para ver tus productos comprados');
            carrito.forEach(compraFinal => {
                alert(`${compraFinal.cantidadProductos} ${compraFinal.seleccionaProducto}, por un TOTAL de $${compraFinal.cantidadProductos * compraFinal.precioProducto} (valor unitario por producto: $${compraFinal.precioProducto})`);
            });
            const totalCompra = carrito.reduce((acc, el) => acc + el.precioProducto * el.cantidadProductos, 0);
            confirm('El total de tu compra es: $' + totalCompra);
            const cuotas = calculaCuotas();
            const intereses = calculaIntereses(cuotas);
            totalCompraFinal(totalCompra, cuotas, intereses);
            alert(nombreCliente.toUpperCase() + ' muchas gracias por tu compra, te redirigiremos al inicio de la tienda por si deseas seguir comprando.');
        } else {
            seleccionarProducto();
        }
    } while (nuevaCompra !== false);
}

/* funcion calcula cuotas */
const calculaCuotas = () => {
    let cuotas = 0;
    let quiereCuotas = confirm('¿Quireres pagar en cuotas?');
    if (quiereCuotas) {
        cuotas = parseInt(prompt('Ingresa el número de cuotas'));
        if (cuotas === 0) {
            cuotas = 1;
        } else if (Number.isNaN(cuotas)) {
            calculaCuotas();
        }
    } else {
        cuotas = 1;
    };
    return cuotas;
}

/* funcion calcula interes cuotas */
const calculaIntereses = (cuotas) => {
    let tasa = 12.3;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesesTotales = 0;

    if (cuotas === 1) {
        return sinIntereses;
    } else {
        tasaTotal = tasa + cuotas * 0.2;
        interesesTotales = tasaTotal * cuotas;
        return interesesTotales;
    }
};

/* funcion total final compra */
const totalCompraFinal = (totalCompra, cuotas, intereses) => {
    totalCompra = (totalCompra + intereses);
    let valorCuota = totalCompra / cuotas;
    alert(`El total a pagar es $${totalCompra} en ${cuotas} cuotas de $${valorCuota.toFixed(2)}`);
};