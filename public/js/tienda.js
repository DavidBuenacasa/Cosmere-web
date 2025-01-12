export const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

export function getCarrito(){
  console.log("prueeba")
  return carrito;
}

window.onload=loadTienda
window.addCarrito=addCarrito;

function loadTienda(){
  // Alcanzar el archivo libros.json y mostrar los libros en la página
  fetch("/json/libros.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Mostrar los libros de la serie de libros de la cosmere
      const booksContainer = document.getElementById("cosmere");
      const cosmere = data.cosmere;

      // POR CADA SERIE
      cosmere.forEach((series) => {
        const seriesTitle = document.createElement("h2");
        seriesTitle.className = "titulo-seccion";
        seriesTitle.textContent = series.nombre;
        booksContainer.appendChild(seriesTitle);

        // Por cada libro
        series.libros.forEach((book) => {
          const bookCard = document.createElement("div");
          bookCard.className = "col-md-4 mb-4 libro";

          bookCard.innerHTML = `
                <div class="h-100 d-flex flex-column  align-items-center tienda-card">
                  <h5 class="card-title text-center texto">${book.titulo}</h5>
                  <img src="${book.imagen}" class="card-img-top imagen-tienda" alt="${book.titulo}">
                  <div class="d-flex flex-row align-items-center p-2">
                    <p class="texto">${book.precio}€</p>
                    <button type="button" class="btn btn-secondary button" onClick="addCarrito('${book.titulo}','${book.precio}','${book.imagen}')">Añadir Al Carrito</button>
                  </div>
                </div>
              `;
          booksContainer.appendChild(bookCard);
        });
      });
    })
    // Error
    .catch((error) => console.error("Error al leer libros.json:", error));
}

//Añadir Libro al carrito
 function addCarrito(titulo, precio, imagen) {
  let libro = {
    titulo: titulo,
    precio: precio,
    imagen: imagen,
    unidad: 1
  };

  //Se comprueba si el libro esta en el carrito, si no esta se añade al array

  if(!checkCarrito(libro)){
    carrito.push(libro);
  }
  
  //Muestra Toast de confirmacion
  showToast()

  //Se guarda en la memoria del navegador
  localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage

}

//Comprueba si el libro esta en el carrito y añade una unidad si es asi

function checkCarrito(libroPar){

  let bookFound=false;

  //Busca el libro en el carrito de compra

  let index = carrito.findIndex(libro => libro.titulo === libroPar.titulo);

  //Si sale -1 el libro no se encuentra en el carrito
  //Si es distinto de menos se suma una unidad al libro

  if(index != -1){
    carrito[index].unidad ++;
    bookFound=true; 
  }
  return bookFound;
}

//Toast Confirmacion
function showToast() {
  var toastEl = document.getElementById("toastCarrito");
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}
