const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}




document.addEventListener("DOMContentLoaded", function () {
  let mail = localStorage.getItem("email")

  if (mail) {                                                           //si hay un mail en el local storage se despliega este Navbar

    document.getElementById("navbarNav").innerHTML = `
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 justify-content-between">
          <li class="nav-item">
            <a class="nav-link" href="mercado.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="categories.html">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">Vender</a>
          </li> 
          <!-- Inicio DropdownMenu -->
        <div class="dropdown">
           <button class="btn btn-dark dropdown-toggle" type="button" id="NavbarNav" 
                 data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                 ${mail}
           </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
               <li><a class="dropdown-item" href="cart.html"> Mi Carrito</a></li>
               <li><a class="dropdown-item" href="my-profile.html" > Mi Perfil</a></li>
               <li><a class="dropdown-item" id="cierreSesion"> Cerrar Sesión</a></li>
          </ul>
        </div>
        <!-- Fin DropdownMenu -->
    </div>`

let cerrarSesion = document.getElementById("cierreSesion")

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("email")
  location.reload()

})

  } else {                                                          //sino este otro

    document.getElementById("navbarNav").innerHTML = `
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav w-100 justify-content-between">
                <li class="nav-item">
                  <a class="nav-link" href="mercado.html">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="categories.html">Categorías</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="sell.html">Vender</a>
                </li>
                <li class="nav-item" id="mail">
                  <a href="index.html" class="nav-link">Iniciar Sesión</a>
                </li>
            </ul>
          </div>`
  }

  

})

function redirect(id) {                                                     //guarda el id del producto y redirige
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

