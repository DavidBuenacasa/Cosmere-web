import { getCarrito } from "/js/tienda.js";

window.onload = loadCarrito;
window.newValue = newValue;
window.vaciarCarrito = vaciarCarrito;
window.realizarCompra = realizarCompra;
window.popElement = popElement;

let carrito = getCarrito();

function loadCarrito() {
  const carritoContainer = document.getElementById("elementosCarrito");

  carritoContainer.innerHTML = "";

  //Comprobamos si el Carrito tiene elementos

  if (carrito.length === 0) {
    //Si esta vacio mostramos un mensaje para que se llene

    const mensajeVacio = document.createElement("h5");
    mensajeVacio.textContent = "No hay elementos pendientes en su carrito";
    mensajeVacio.className = "text-center";
    carritoContainer.appendChild(mensajeVacio);



  } else {
    //Si tiene elementos iteramos sobre ellos y los mostramos

    //COntenedor para las carritoCard
    const cardContainer = document.createElement("div")
    cardContainer.className = "cardContainer";

    carrito.forEach((book) => {
      const carritoCard = document.createElement("div");
      carritoCard.className = "carritoCard";

      carritoCard.innerHTML = `
        <div class=" d-flex justify-content-center row">
            <div class="col-3 image-container">
              <img src="${
                book.imagen
              }" class="card-img imagen-carrito" alt="${book.titulo}">
            </div>
            
            <div class="info-card col-5">
                <h5 class="card-title tituloCard">${book.titulo}</h5>
                <p>Autor: ${book.autor}</p>
                <p>Fecha de Lanzamiento: ${book.lanzamiento}</p>
                <p class="sinopsis"> ${book.sinopsis}</p>
            </div>
            <div class="d-flex  align-items-center unit-price col-4">
                <div>
                    <input type="number" value="${
                      book.unidad
                    }" min="1" onchange="newValue(event,'${
        book.titulo
      }')" class="form-control units">
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="m-0">Precio Unitario</p>  
                    <p class="m-0">${book.precio}€</p>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="m-0">Total</p>  
                    <p class="m-0">${parseFloat(
                      book.precio * book.unidad
                    ).toFixed(2)}€</p>
                </div>
            </div>
            <div class="button-container col-1">
                <button type="button" class="btn btn-danger" onclick="popElement('${
                  book.titulo
                }')">
                    <img src="/icon/eliminar.png" class="icon-eliminar">
                </button>
            </div>

        </div>
                  `;
        cardContainer.appendChild(carritoCard)
    });

    

    carritoContainer.appendChild(cardContainer)

    const resume = document.createElement("div");

    resume.innerHTML = `
      <div class="d-flex flex-column align-items-end">
          <h5 id="precioTotal"></h5>
          <div class="d-flex gap-3">
              <button type="button" class="btn btn-light" onclick="vaciarCarrito()">Vaciar Carrito</button>
              <a href="/html/form.html" class="btn btn-success">Realizar Compra</a>
          </div>
      </div>
      `;
    carritoContainer.appendChild(resume);
    actualizarTotal();
  }
}

function popElement(titulo) {
  //buscamos el titulo
  const index = carrito.findIndex((libro) => libro.titulo === titulo);

  carrito.splice(index, 1);
  actualizarvariables();
}

//Si modificamos las unidades de los libros se ejecuta
function newValue(event, titulo) {
  const newUnit = parseFloat(event.target.value); // Convertir el valor del input a número
  const index = carrito.findIndex((book) => book.titulo === titulo); //Encontrar el index del libro
  carrito[index].unidad = newUnit;
  actualizarvariables();
}

function actualizarTotal() {
  let totalElement = document.getElementById("precioTotal");
  let total = sumCarrito();
  totalElement.textContent = total + "€";
}

function sumCarrito() {
  let total = 0;

  carrito.forEach((book) => {
    total += parseFloat(book.precio) * parseInt(book.unidad, 10);
  });

  return total.toFixed(2);
}

function actualizarvariables() {
  actualizarLocalStorage();
  loadCarrito();
}

//Vacia el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarvariables();
}

//Vacia el carrito
function realizarCompra() {}


function actualizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
}
