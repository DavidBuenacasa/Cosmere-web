 //Enviar Email
(function () {  
      //Iniciamos EmailJS con nuestra KEY
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

                fetch('/api/send', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email }),
                }).then(response => {
                  if (response.ok) {
                      showToast();
                  }
                }).catch(error => {
                  console.error('Error sending email:', error);
                });
              }
              form.classList.add("was-validated");
            },
            false
          );
        },
        false
      );
    
  
  })();


//Toast Confirmacion
function showToast() {
  var toastEl = document.getElementById("toastNewsletter");
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}

