 //Enviar Email
(function () {
    "use strict";
  
    //Recuperamos las variables de entorno definidas anteriormente
    fetch('/api/env')
    .then(response => response.json())
    .then((data) =>{
  
      //Iniciamos EmailJS con nuestra KEY
      emailjs.init(data.keyPublic);
  
      window.addEventListener(
        "load",
        function () {
  
          //Recuperamos el formulario
          var form = document.getElementById("formulario-newsletter");
          form.addEventListener(
            "submit",
            
            function (event) {
              if (form.checkValidity() === false) {
  
                //Error en las validaciones
                event.preventDefault();
                event.stopPropagation();
              } else {
                //Validaciones COrrectas
                event.preventDefault();
  
                //Recuperamos el valor del input email
                var email = document.getElementById("email").value; // Envía el correo usando EmailJS
  
                //Enviamos el Email al destinatario
                emailjs
                  .send(data.serviceKey,data.templateKey, { to_email: email })
                  .then(
                    function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                      showToast();
                    },
                    function (error) {
                      console.log("FAILED...", error);
                    }
                  );
              }
              form.classList.add("was-validated");
            },
            false
          );
        },
        false
      );
  })
    
  
  })();

//Toast Confirmacion
function showToast() {
  var toastEl = document.getElementById("toastNewsletter");
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function almacenarCorreoJSON(){
  
}