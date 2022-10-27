ID = localStorage.getItem("catID")

let url = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`
let datos = [];
let min = undefined
let max = undefined
let buscar = undefined

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            datos = resultObj.data
            ListaArticulos();
            producto();
        }

    })

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        min = parseInt(document.getElementById("rangeFilterCountMin").value);
        max = parseInt(document.getElementById("rangeFilterCountMax").value);

        if ((min != undefined) && (min != "") && (parseInt(min)) >= 0) {                              // evita que el campo quede NaN y sea o undefined o un numero
            min = parseInt(min);
        }
        else {
            min = undefined;
        }

        if ((max != undefined) && (max != "") && (parseInt(max)) >= 0) {
            max = parseInt(max);
        }
        else {
            max = undefined;
        }

        ListaArticulos()
    })

    document.getElementById("clearRangeFilter").addEventListener("click", function () {              // limpia lo campos de min y max los setea en undefined y carga los articulos de nuevo

        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        max = undefined;
        min = undefined;

        ListaArticulos();
    });



    document.getElementById("buscar").addEventListener("input", function () {
        buscar = document.getElementById("buscar").value.toLowerCase();
        ListaArticulos();
    })


    document.getElementById("sortAsc").addEventListener(`click`, function () {                                        //ordena de forma ascendente por precio

        datos.products.sort(function (a, b) {
            return a.cost - b.cost
        })
        ListaArticulos()
    })


    document.getElementById("sortDesc").addEventListener(`click`, function () {                                        // ordena de forma descendente por precio

        datos.products.sort(function (a, b) {
            return b.cost - a.cost
        })
        ListaArticulos()
    })

    document.getElementById("sortBySold").addEventListener(`click`, function () {                                     // ordena del mas vendido al menos vendido

        datos.products.sort(function (a, b) {
            return b.soldCount - a.soldCount
        })
        ListaArticulos()
    })

})


function ListaArticulos() {
    let contenido = "";
    for (let articulo of datos.products) {
        articulo.cost = parseInt(articulo.cost);

        if ((min == undefined && max == undefined) || (articulo.cost >= min && articulo.cost <= max) ||          // filtra por precio
            (min == undefined && articulo.cost <= max) || (articulo.cost >= min && max == undefined)) {

            if (buscar == undefined || buscar == "" || articulo.name.toLowerCase().includes(buscar) || articulo.description.toLowerCase().includes(buscar)) {   // filtra por nombre o descripcion tipeados
                contenido += `
                <div onclick="redirect(${articulo.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${articulo.image}" alt="${articulo.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${articulo.name} - ${articulo.currency} ${articulo.cost}</h4>
                                <small class="text-muted">${articulo.soldCount} Vendidos</small>
                            </div>
                            <p class="mb-1">${articulo.description}</p>
                        </div>
                    </div>
                </div>
                `
            }
        }
    }

    document.getElementsByClassName("container")[2].innerHTML = contenido;
}

// recorre un array y los dibuja con los parametros seleccionados

producto = () => document.getElementById(`articulos`).innerHTML = `Verás aquí todos los productos de la categoría <strong>${datos.catName}</strong>`

// agrega en el parrafo el nombre de la categoria


