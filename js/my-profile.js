let boton = document.getElementById("btnSubmit");
let campoEmail = document.getElementById("email");
let mail = localStorage.getItem("email");
let priNombre = document.getElementById("nombre1");
let segNombre = document.getElementById("nombre2")
let priApellido = document.getElementById("apellido1");
let segApellido = document.getElementById("apellido2");
let telefono = document.getElementById("telefono");

(function () {
  'use strict'

  let forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()

        }
        
        form.classList.add('was-validated')
      }, false)
    })
})()


document.addEventListener("DOMContentLoaded", () => {
  usuario = localStorage.getItem("usuario")


  if (usuario) {                                    //si existe un usuario ya registrado con el mismo mail, muestra sus datos en los campos
    users = JSON.parse(usuario)
    for (let usr of users) {
      if (usr.mail == mail) {

        priNombre.value = usr.firstName
        segNombre.value = usr.secName
        priApellido.value = usr.firstLastName
        segApellido.value = usr.secLastName
        telefono.value = usr.tel
        campoEmail.value = mail
      } else {
        campoEmail.value = mail

      }
    }
  } else {
    campoEmail.value = mail
  }


  boton.addEventListener("click", () => {                       //al presionar el boton guardar se crea un objeto con todos los datos del usuario y se guarda en un array
    
    if(priNombre.value !== "" && priApellido.value !== "" && mail){
    user = {
      firstName: `${priNombre.value}`,
      secName: `${segNombre.value}`,
      firstLastName: `${priApellido.value}`,
      secLastName: `${segApellido.value}`,
      tel: `${telefono.value}`,
      mail: `${mail}`
    }}

    if (usuario) {                                              //si el mail del usuario no esta registrado , se agrega al array
      users = JSON.parse(usuario)
      console.log(user.mail)
      if (!users.includes(user.mail)) {
        users.push(user)
        localStorage.setItem("usuario", JSON.stringify(users))
      }
    } else {                                            //si no existe el array "usuario" lo crea y agrega al usuario recien registrado
      users = []
      users.push(user)
      localStorage.setItem("usuario", JSON.stringify(users))

    }
  })






})



