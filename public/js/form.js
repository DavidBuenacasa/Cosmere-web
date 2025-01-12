(function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        var form = document.getElementById("formularioEnvio");

        //Al enviar el formulario
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
                //Error en las validaciones
              event.preventDefault();
              event.stopPropagation();
            } else {
                //Validaciones Correctas
              event.preventDefault();
              //Llamada al modal
              $("#modalCompra").modal("show");
            }
            form.classList.add("was-validated");
          },
          false
        );
      },
      false
    );
  })();