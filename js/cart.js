const URL_Cart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const agregarCart = document.getElementById("agregarArt");
let carrito = localStorage.getItem("cartCompras");
let compra = JSON.parse(carrito)
costo = ""

document.addEventListener("DOMContentLoaded", function () {
    fetch(URL_Cart)
        .then(res => res.json())
        .then(data => {
            datos = data.articles[0]
            addCart()
            total()
            mostrarTotal()
        })
        .catch(err => {
            console.log(err)
            alert("Algo salio mal")
        })

    function addCart() {                                            //dibuja los articulos del carro en pantalla
        addProd = ""
        if (compra) {
            for (let prod of compra) {
                addProd += `
            <tr  id="${prod.id}" class="test">
                <th  scope="row"><img style="width: 10rem ;" src="${prod.image}" alt="imagen del producto"></th>
                    <td>${prod.name}</td>
                    <td>${prod.currency} ${prod.unitCost}</th>
                    <td><input id="${prod.id}" type="number" style="width: 5rem ;" class="form-control" value = 1 min = 1></td>
                    <td id="b${prod.id}"><strong>${prod.currency} ${prod.unitCost}</strong></td>
             </tr>
             `
            }
        }

        agregarCart.innerHTML = addProd
    }

    agregarCart.addEventListener("click", function (e) {
        subtotal(e)
        total()
        mostrarTotal()
    })

    function subtotal(e) {                                              // calcula el subtotal para cada articulo
        if (e.target.id) {
            document.getElementById(e.target.id).addEventListener("input", function () {
                compra.filter(item => {
                    if (item.id == e.target.id) {
                        if (e.target.value > 0) {

                            costo = parseInt(compra[compra.indexOf(item)].unitCost) * parseInt(e.target.value)
                            document.getElementById("b" + e.target.id).innerHTML = `<strong> ${compra[compra.indexOf(item)].currency} ${costo}`
                            item.count = e.target.value

                        }
                    }
                })

            })
        }
    }

    function total() {                                                             //calcula el subtotal antes de costos de envio
        contador = 0

        for (let precio of compra) {
            if (precio.currency == "UYU") {
                contador += parseInt(precio.unitCost / 42) * precio.count  // precio del dolar : 42 pesos por dolar
            } else {
                contador += precio.unitCost * precio.count
            }
        }

        return contador

    }

    function costoEnvio() {

    }

    function mostrarTotal() {
        document.getElementById("subtotal").innerHTML = `<p>Subtotal</p> <span>USD ${total()}</span>`
    }





















})



