let email = document.getElementById("email")
let pass = document.getElementById("pass")
let boton = document.getElementById("boton")




boton.addEventListener(`click`, function () {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let correo = expReg.test(email.value);
    if (pass.value.length > 0 && correo== true ) {
        localStorage.setItem("email", email.value)
        window.location.href = "mercado.html";
    }
    else {
        document.getElementById("alerta").innerHTML = `
        <div class="alert alert-danger d-flex justify-content-around" role="alert">
        Datos ingresados incorrectos o vacios
      </div>`;
    }
})
