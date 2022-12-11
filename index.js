/* variables globales */
let carrito = [];
let nombreCliente;
let nuevoProducto = '';

/* evento click para ver carrito*/
const verCarrito = document.getElementById("verCarrito");

/* inicia flujo carrito compras */
verCarrito.addEventListener("click", () => {
    nombreCliente = prompt('Hola, por favor ingresa tu nombre');
    while (nombreCliente !== null && nombreCliente !== '') {
        let seleccion = confirm('¡Bienvenido ' + nombreCliente?.toUpperCase() + '!\n\n¿Deseas revisar nuestros productos? \n\n Selecciona "CANCELAR" para salir \n Selecciona "ACEPTAR" para continuar');
        if (seleccion === true) {
            const ordenaProductos = confirm('¿Quieres ordenar los productos del más barato al más caro?');
            ordenaProductos ? ordenaMenorMayor() : ordenaMayorMenor();
        } else {
            nombreCliente = null;
            alert('Gracias por visitarnos, hasta pronto!!!');
        }
    }
});

/* funcion que ordena productos de menor a mayor precio */
const ordenaMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio);
    listaProductos();
}

/* funcion que ordena productos de mayor a menor precio */
const ordenaMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio);
    listaProductos();
}

/* funcion seleccionar productos */
const listaProductos = () => {
    finCompra = false;
    carrito = [];
    const productosOrdenados = productos.map(producto => {
        return '- ' + producto.nombre + ' con un precio de $' + producto.precio
    });
    const seleccionaProducto = prompt('Seleccione un producto de nuestra lista: \n\n' + productosOrdenados.join('\n'), 'ej: polera');
    if (seleccionaProducto !== null) {
        if (seleccionaProducto !== '') {
            agregaProducto(seleccionaProducto);
        } else {
            alert('Debe ingresar un producto');
            listaProductos();
        }
    } else {
        const salirCompra = confirm('¿Desea volver al inicio de su compra?');
        if (!salirCompra) {
            listaProductos();
        }
    }
}

/* funcion agregar producto */
const agregaProducto = (seleccionaProducto) => {
    let cantidadProductos = 0;
    do {
        cantidadProductos = parseInt(prompt("¿Cuantas unidades desea comprar?"));
        if (!isNaN(cantidadProductos)) {
            if (cantidadProductos !== 0) {
                const producto = productos.find(producto => producto.nombre.toLowerCase() === seleccionaProducto.toLowerCase());
                if (producto) {
                    agregaCompra(producto, cantidadProductos);
                } else {
                    alert('No contamos con el producto seleccionado');
                }
            } else {
                alert('Debes ingresar una cantidad mayor a cero');
                agregaProducto(seleccionaProducto);
            }
        } else {
            alert('Debe ingresar unidades a comprar');
            agregaProducto(seleccionaProducto);
        }
        if (finCompra === false) {
            nuevoProducto = confirm('¿Desea agregar otro producto?');
            if (nuevoProducto) { listaProductos(); }
        }
    } while (nuevoProducto);
    confirmaCompra();
}

/* funcion que agrega compra al carrito */
agregaCompra = (objetoProducto, cantidadProducto) => {
    const productosRepetidos = carrito.find(producto => producto.id === objetoProducto.id);
    if (productosRepetidos) {
        productosRepetidos.cantidad += cantidadProducto;
    } else {
        objetoProducto.cantidad += cantidadProducto;
        carrito.push(objetoProducto);
    }
};

/* funcion que confirma la compra o elimina un producto del carrito */
confirmaCompra = () => {
    if (finCompra === false) {
        const listaProductosMap = carrito.map(producto => {
            return `${producto.nombre} | cantidad: ${producto.cantidad}`;
        });
        const confirmar = confirm(`Tu compra a realizar es: \n\n${listaProductosMap.join('\n')} \n\n Selecciona "Cancelar" para eliminar algún producto del carrito \n Selecciona "Aceptar" para continuar con tu compra`);

        if (confirmar) {
            finalizarCompra();
        } else {
            const productoEliminar = prompt(`Ingrese el nombre del producto que desea eliminar: \n\n ${listaProductosMap.join('\n')} \n`);
            if (productoEliminar !== null) {
                const productoEliminarFind = carrito.find(producto => producto.nombre.toLowerCase() === productoEliminar.toLowerCase());
                if (productoEliminarFind) {
                    eliminaProducto(productoEliminar);
                } else {
                    alert('Producto no existe en su carrito');
                    confirmaCompra();
                }
            } else {
                alert('Ingrese un producto a eliminar');
                confirmaCompra();
            }
        }
    }
}

/* funcion que elimina producto del carrito */
eliminaProducto = (productoEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoEliminar) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else
                carrito.splice(index, 1);
        }
    });
    alert(`Un producto de ${productoEliminar} fue eliminado de su carrito`);
    confirmaCompra();
};

/* funcion que finaliza la compra */
finalizarCompra = () => {
    const totalProductoUnitario = carrito.map(producto => {
        return `${producto.nombre} | cantidad: ${producto.cantidad} | precio: $${producto.precio} | total: $${producto.precio * producto.cantidad}`;
    });

    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    alert(nombreCliente.toUpperCase() + ' el detalle de tu compra es:'
        + '\n\n' + totalProductoUnitario.join('\n')
        + '\n\n Cantidad total de productos: ' + totalProductos
        + '\n\n El TOTAL final de tu compra es: $' + totalCompra
    );
    const cuotas = calculaCuotas();
    const intereses = calculaIntereses(cuotas);
    totalCompraFinal(totalCompra, cuotas, intereses);
    alert(`${nombreCliente.toUpperCase()} muchas gracias por tu compra \n\nSeras redirigido al inicio de la tienda por si deseas seguir comprando.`);
    finCompra = true;
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
    alert(`El total a pagar es $${totalCompra.toFixed()} en ${cuotas} cuotas de $${valorCuota.toFixed()}`);
};