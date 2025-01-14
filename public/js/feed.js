
//Feed del cosmere
async function fetchCosmereFeed() {
    try{
        const response =await fetch('/api/feed/feed1');
        const data = await response.json();
        const feedContainer = document.getElementById("cosmere-feed");
        feedContainer.innerHTML=``;


        data.items.forEach(item =>{
            const title = item.title;
            const link = item.link;
            const autor = item.creator;
            const pubDate = formatearFechaRFC(item.pubDate);
            const content = item.content;
            
            //REcuperamos el content del archivo
            const encoded = item['content:encoded'];
            //Con una expresion regular buscamos la imagen
            const regex = /<img[^>]+src="([^"]+)"/;
            //Recuperamos la imagen principal del archivo si existe
            const match = encoded.match(regex);
            let imageURL="";

            if(match !=null && match.length > 0){
                imageURL = match[1]
            }
            
            const newContainer = document.createElement("div");
            newContainer.className="cosmereFeed";

            newContainer.innerHTML = `
                <div class="card col">
                    <a href="${link}">
                        <img src="${imageURL}" class="card-img-top image-new" alt="...">
                        <div class="card-body">
                            <h2 class="titulo">${title}</h2>
                            <p class="texto">${pubDate}</p>
                            <p class="texto">${autor}</p>
                            <p class="texto descripcion">${content}</p>
                        </div>
                    </a>
                </div>
            `;

            feedContainer.appendChild(newContainer);
        });


    }catch (error){
        console.error("Error al obtener el feed",error)
    }
}

//Feed de Sanderson
async function fetchSandersonFeed() {
    try{
        const response =await fetch('/api/feed/feed2');
        const data = await response.json();

        const feedContainer = document.getElementById("sanderson-feed");
        feedContainer.innerHTML=``;

        data.items.forEach(item =>{
            const title = item.title;
            const link = item.link;
            const autor = item.author;
            const pubDate = formatearFechaISO(item.pubDate);            

            const newContainer = document.createElement("div");
            newContainer.className="sandersonFeed";

            newContainer.innerHTML = `
                <div class="card col">
                    <a href="${link}">
                        <div class="card-body">
                            <h2 class="titulo">${title}</h2>
                            <p class="texto">${pubDate}</p>
                            <p class="texto">${autor}</p>
                        </div>
                    </a>
                </div>
            `;

            feedContainer.appendChild(newContainer);
        });


    }catch (error){
        console.error("Error al obtener el feed",error)
    }
}


function formatearFechaRFC(fechaRFC) {
    // Comprobamos que la fecha es válida
    const fechaObj = new Date(fechaRFC);
    if (isNaN(fechaObj)) {
        return 'Fecha inválida';
    }

    const dia = String(fechaObj.getUTCDate()).padStart(2, '0'); // Obtener el día en UTC
    const anio = fechaObj.getUTCFullYear(); // Obtener el año en UTC

    // Array de meses en español
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const mes = meses[fechaObj.getUTCMonth()]; // Obtener el mes en español

    return `${dia} de ${mes} de ${anio}`; // Formato "dd de Mes de año"
}

//Formatear la fecha de las publicaciones de Sanderson Feed
function formatearFechaISO(fechaISO) {
    // Comprobamos que la fecha es válida
    const fechaObj = new Date(fechaISO);
    if (isNaN(fechaObj)) {
        return 'Fecha inválida';
    }

    const dia = String(fechaObj.getUTCDate()).padStart(2, '0'); // Obtener el día en UTC
    const anio = fechaObj.getUTCFullYear(); // Obtener el año en UTC

    // Array de meses en español
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const mes = meses[fechaObj.getUTCMonth()]; // Obtener el mes en español

    return `${dia} de ${mes} de ${anio}`; // Formato "dd de Mes de año"
}

fetchCosmereFeed();
fetchSandersonFeed();