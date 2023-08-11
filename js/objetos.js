// Definición de arreglos
arArticulos = [];
arFacturas = [];
arVentas = [];

// Función para agregar un artículo al arreglo de arArticulos
let pArticulo = function () {
    let vrreferencia = document.getElementById("ref").value;
    let vrnombre = document.getElementById("nom").value;
    let vrunitario = parseInt(document.getElementById("unitario").value);

    let encontrado = arArticulos.find(elemento => elemento['referencia'] == vrreferencia)
    if (encontrado == undefined) {
        let objArticulo = {}
        objArticulo.referencia = vrreferencia
        objArticulo.nombre = vrnombre
        objArticulo.vunitario = vrunitario

        arArticulos.push(objArticulo)
    } else {
        alert("La referencia ingresada ya le pertenece a otro articulo");
    }
}

// Borrar formulario agregar
let BFpArticulo = function () {
    let vrreferencia = document.getElementById("ref");
    let vrnombre = document.getElementById("nom");
    let vrunitario = document.getElementById("unitario");
    vrreferencia.value = ""
    vrnombre.value = ""
    vrunitario.value = ""
}


// Función para consultar un artículo por su referencia
let busReferencia = function (propBuscar, valBuscar) {
    return arArticulos.findIndex(elemento => elemento[propBuscar] == valBuscar)
}

function ConsultarArticulo() {
    let auxvrreferencia = document.getElementById("refC").value;
    let auxvrreferencia2 = document.getElementById("refC");
    let auxvrnombre = document.getElementById("nomC");
    let auxvrunitario = document.getElementById("unitarioC");
    let posicion = busReferencia("referencia", auxvrreferencia)

    if (posicion == -1) {
        alert("El artículo no existe");
        auxvrreferencia2.value = ""
        auxvrnombre.value = ""
        auxvrunitario.value = ""
    } else {
        let vrtmpNombre = arArticulos[posicion].nombre
        let vrtmpUnitario = arArticulos[posicion].vunitario

        auxvrnombre.value = vrtmpNombre
        auxvrunitario.value = vrtmpUnitario
    }
}

// Borrar formulario modificar
let BFconsultar = function () {
    let vrreferencia = document.getElementById("refC");
    let vrnombre = document.getElementById("nomC");
    let vrunitario = document.getElementById("unitarioC");
    vrreferencia.value = ""
    vrnombre.value = ""
    vrunitario.value = ""
}

// Función para modificar un artículo por su referencia
function ConsultarArticuloM() {
    let auxvrreferencia = document.getElementById("refM").value;
    let auxvrreferencia2 = document.getElementById("refM");
    let auxvrnombre = document.getElementById("nomM");
    let auxvrunitario = document.getElementById("unitarioM");
    let posicion = busReferencia("referencia", auxvrreferencia)

    if (posicion == -1) {
        alert("El artículo no existe.");
        auxvrreferencia2.value = ""
        auxvrnombre.value = ""
        auxvrunitario.value = ""
    } else {
        let vrtmpNombre = arArticulos[posicion].nombre
        let vrtmpUnitario = arArticulos[posicion].vunitario

        auxvrnombre.value = vrtmpNombre
        auxvrunitario.value = vrtmpUnitario
        auxvrreferencia2.disabled = true
        auxvrnombre.disabled = false
        auxvrunitario.disabled = false
    }
}

function modificar() {
    let auxvrreferencia = document.getElementById("refM").value;
    let auxvrreferencia2 = document.getElementById("refM");
    let auxvrnombre = document.getElementById("nomM").value;
    let auxvrnombre2 = document.getElementById("nomM");
    let auxvrunitario = parseInt(document.getElementById("unitarioM").value);
    let auxvrunitario2 = document.getElementById("unitarioM");
    let posicion = busReferencia("referencia", auxvrreferencia)

    if (posicion != -1) {
        arArticulos[posicion].nombre = auxvrnombre
        arArticulos[posicion].vunitaro = auxvrunitario
    }
    BFmodificar()
    auxvrreferencia2.disabled = false
    auxvrnombre2.disabled = true
    auxvrunitario2.disabled = true
}

// Borrar formulario modificar
let BFmodificar = function () {
    let vrreferencia = document.getElementById("refM");
    let vrnombre = document.getElementById("nomM");
    let vrunitario = document.getElementById("unitarioM");
    vrreferencia.value = ""
    vrnombre.value = ""
    vrunitario.value = ""
}

// Función para eliminar un artículo por su referencia
function eliminarArticulo() {
    let auxvrreferencia = document.getElementById("refE").value;
    let posicion = busReferencia("referencia", auxvrreferencia)

    if (posicion == -1) {
        alert("El artículo no existe.");
    } else {
        // Verificar si el artículo está relacionado en alguna factura
        let relacionadoEnFactura = arVentas.some((venta) => venta.referencia === auxvrreferencia);
        if (relacionadoEnFactura) {
            alert("No se puede eliminar el artículo, está relacionado en alguna factura.");
            return;
        }

        // Eliminar el artículo del arreglo (asumiendo que objArticulo es la referencia)
        let index = arArticulos.findIndex((articulo) => articulo.referencia === auxvrreferencia);
        if (index !== -1) {
            arArticulos.splice(index, 1);
            alert("Artículo eliminado exitosamente.");
        } else {
            alert("El artículo no se encontró en el arreglo.");
        }
    }
    BFeliminar()
}

let BFeliminar = function () {
    let vrreferencia = document.getElementById("refE");
    vrreferencia.value = ""
}

function mostrarArticulo() {
    let valorReferencia = document.getElementById('txtReferencia').value;
    let valReferencia = document.getElementById('txtReferencia');
    let valnombre = document.getElementById('txtArticulo');
    let valuni = document.getElementById('txtVUnitario');
    let valcant = document.getElementById('txtCantidad');
    let index = arArticulos.findIndex(articulo => articulo.referencia === valorReferencia);
    if (index == -1) {
        alert("El artículo no existe.");
        valReferencia.value = ""
    } else {
        valcant.disabled = false
        valcant.focus()
        valnombre.value = arArticulos[index].nombre
        valuni.value = arArticulos[index].vunitario
    }
}

function calcularTotal() {
    let valorReferencia = document.getElementById('txtReferencia').value;
    let valcant = parseInt(document.getElementById('txtCantidad').value);
    let valtot = document.getElementById('txtVTotal');
    let index = arArticulos.findIndex(articulo => articulo.referencia === valorReferencia);
    if (index == -1) {
        alert("El artículo no existe.");
    } else {
        let uni = arArticulos[index].vunitario
        let tot = uni * valcant
        valtot.value = tot
    }
}

// Función para agregar un artículo al arreglo de Facturas
let pFacturas = function () {
    let vrnfactura = document.getElementById("txtFactura").value;
    let vrnfactura2 = document.getElementById("txtFactura");
    let vrfecha = document.getElementById("txtFecha").value;
    let vrcliente = document.getElementById("txtCliente").value;
    if (vrnfactura2.value.trim() !== "") {
        let objFactura = {}
        objFactura.nFac = vrnfactura
        objFactura.fecha = vrfecha
        objFactura.nCliente = vrcliente

        arFacturas.push(objFactura)
        BFfactura()
    } else {
        alert("Ingresar datos de la factura");
    }

}

// Función para agregar un artículo al arreglo de Ventas
let pVentas = function () {
    let vrnfactura = document.getElementById("txtFactura").value;
    let vrref = document.getElementById("txtReferencia").value;
    let vrcant = parseInt(document.getElementById("txtCantidad").value);
    let vrtot = document.getElementById("txtVTotal");

    if (vrtot.value.trim() !== "") {
        let objVenta = {}
        objVenta.nFac = vrnfactura
        objVenta.referencia = vrref
        objVenta.cantidad = vrcant

        arVentas.push(objVenta)
        let txtInformacion = document.getElementById("divfac");


        txtInformacion.style.display = "none"; // Cambia el estilo para ocultar el div

        // Tabla
        let ref = parseInt(document.getElementById("txtReferencia").value);
        let Articulo = document.getElementById("txtArticulo").value;
        let valor = parseInt(document.getElementById("txtVUnitario").value);
        let cantidad = parseInt(document.getElementById("txtCantidad").value);

        if (tblFacturacion.rows.length === 0) {
            // Crear una nueva fila en la tabla de facturación (títulos)
            let headerRow = tblFacturacion.insertRow(0);

            // Agregar celdas de títulos a la fila de encabezado
            let cellTituloRef = headerRow.insertCell(0);
            cellTituloRef.innerHTML = "Referencia";

            let cellTituloArticulo = headerRow.insertCell(1);
            cellTituloArticulo.innerHTML = "Artículo";

            let cellTituloValor = headerRow.insertCell(2);
            cellTituloValor.innerHTML = "Valor Unitario";

            let cellTituloCantidad = headerRow.insertCell(3);
            cellTituloCantidad.innerHTML = "Cantidad";

            let cellTituloTotal = headerRow.insertCell(4);
            cellTituloTotal.innerHTML = "Total";
        }

        // Crear una nueva fila en la tabla de facturación (datos)
        let newRow = tblFacturacion.insertRow();

        // Agregar celdas de datos a la fila
        let cellRef = newRow.insertCell(0);
        cellRef.innerHTML = ref;

        let cellArticulo = newRow.insertCell(1);
        cellArticulo.innerHTML = Articulo;

        let cellValor = newRow.insertCell(2);
        cellValor.innerHTML = valor;

        let cellCantidad = newRow.insertCell(3);
        cellCantidad.innerHTML = cantidad;

        let cellTotal = newRow.insertCell(4);
        cellTotal.innerHTML = valor * cantidad;
    } else {
        alert("Ingrese un articulo");
    }
    BFAProducto()
}

// Borrar formulario factura
let BFfactura = function () {
    let vrnfactura = document.getElementById("txtFactura");
    let vrfecha = document.getElementById("txtFecha");
    let vrcliente = document.getElementById("txtCliente");
    let vrreferencia = document.getElementById("txtReferencia");
    let vrnombre = document.getElementById("txtArticulo");
    let vrunitario = document.getElementById("txtVUnitario");
    let vrcantidad = document.getElementById("txtCantidad");
    let vrtotal = document.getElementById("txtVTotal");
    vrnfactura.value = ""
    vrfecha.value = ""
    vrcliente.value = ""
    vrreferencia.value = ""
    vrnombre.value = ""
    vrunitario.value = ""
    vrcantidad.value = ""
    vrtotal.value = ""
    let txtInformacion = document.getElementById("informacion");
    txtInformacion.style.display = "none";
    reiniciarDiv()
    reiniciarTablas()
}

function reiniciarTablas() {
    let tblFacturacion = document.getElementById("tblFacturacion");
    let tblTotales = document.getElementById("tblTotales");

    // Eliminar todas las filas de la tabla de facturación
    while (tblFacturacion.rows.length > 0) {
        tblFacturacion.deleteRow(0);
    }

    // Eliminar todas las filas de la tabla de totales
    while (tblTotales.rows.length > 0) {
        tblTotales.deleteRow(0);
    }
}

function reiniciarDiv() {
    let txtInformacion = document.getElementById("informacion");
    txtInformacion.innerHTML = "";
}


// Borrar formulario Articulo
let BFAProducto = function () {
    let vrreferencia = document.getElementById("txtReferencia");
    let vrnombre = document.getElementById("txtArticulo");
    let vrunitario = document.getElementById("txtVUnitario");
    let vrcantidad = document.getElementById("txtCantidad");
    let vrtotal = document.getElementById("txtVTotal");
    vrreferencia.value = ""
    vrnombre.value = ""
    vrunitario.value = ""
    vrcantidad.value = ""
    vrtotal.value = ""
}

// function de facturacion
let facturacion = function () {
    let vrnfactura = document.getElementById("txtFactura").value;
    let vrnfactura2 = document.getElementById("txtFactura");
    let vrfecha = document.getElementById("txtFecha").value;
    let vrcliente = document.getElementById("txtCliente").value;

    if (vrnfactura2.value.trim() !== "") {
        let txtInformacion = document.getElementById("informacion");
        let divfactura = document.getElementById("divfac");
        let tblFacturacion = document.getElementById("tblFacturacion");
        let tblTotales = document.getElementById("tblTotales");

        let titulo = document.createElement("h1");
        let Br = document.createElement("br");
        let Br2 = document.createElement("br");
        let Br3 = document.createElement("br");
        let nfactura = document.createElement("label");
        let ncliente = document.createElement("label");
        let nfecha = document.createElement("label");

        titulo.innerHTML = "Detalle de la Factura";
        nfactura.innerHTML = "Número de factura: " + vrnfactura;
        ncliente.innerHTML = "Nombre de cliente: " + vrcliente;
        nfecha.innerHTML = "Fecha de venta: " + vrfecha;

        txtInformacion.appendChild(titulo);
        txtInformacion.appendChild(Br3);
        txtInformacion.appendChild(nfactura);
        txtInformacion.appendChild(Br);
        txtInformacion.appendChild(ncliente);
        txtInformacion.appendChild(Br2);
        txtInformacion.appendChild(nfecha);
        divfactura.style.display = "block";
        txtInformacion.style.display = "block";

        // Calcular el valor total de los artículos ingresados
        let totalArticulos = 0;

        // Recorrer todas las filas de la tabla de facturación excepto la primera (que contiene los títulos)
        for (let i = 1; i < tblFacturacion.rows.length; i++) {
            totalArticulos += parseFloat(tblFacturacion.rows[i].cells[4].innerHTML);
        }

        // Calcular el valor del IVA (19%)
        let iva = totalArticulos * 0.19;

        // Calcular el valor total más el IVA
        let totalConIVA = totalArticulos + iva;

        // Crear una nueva fila en la tabla de totales
        let newRowTotales = tblTotales.insertRow();

        // Agregar celdas a la fila de totales
        let cellsubtotal = newRowTotales.insertCell(0);
        cellsubtotal.colsPan = 3;
        cellsubtotal.style.width = "68%";
        cellsubtotal.innerHTML = "Subtotal";

        let cellValorTotalArticulos = newRowTotales.insertCell(1);
        cellValorTotalArticulos.innerHTML = totalArticulos.toFixed(0);

        // Crear una nueva fila en la tabla de totales
        let newRowIVA = tblTotales.insertRow();

        // Agregar celdas a la fila de totales para el IVA
        let cellIVA = newRowIVA.insertCell(0);
        cellIVA.colsPan = 3;
        cellIVA.style.width = "68%";
        cellIVA.innerHTML = "IVA (19%)";

        let cellValorIVA = newRowIVA.insertCell(1);
        cellValorIVA.innerHTML = iva.toFixed(0);

        // Crear una nueva fila en la tabla de totales
        let newRowTotalConIVA = tblTotales.insertRow();

        // Agregar celdas a la fila de totales para el valor total más el IVA
        let cellTotalConIVA = newRowTotalConIVA.insertCell(0);
        cellTotalConIVA.colsPan = 3;
        cellTotalConIVA.style.width = "68%";
        cellTotalConIVA.innerHTML = "Total con IVA";

        let cellValorTotalConIVA = newRowTotalConIVA.insertCell(1);
        cellValorTotalConIVA.innerHTML = totalConIVA.toFixed(0);
    } else {
        alert("Ingresar datos de la factura");
    }

}
