const express =require('express');
const app = express();
const port = 4678;

require('dotenv').config();

app.use(express.static('public'))

app.get('/', (req, res) =>{
    //Ruta del proyecto
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/api/env',(req,res) =>{
    //Definimos las variables de entorno de emailJS para utilizarlas posteriormente
    res.json({
        templateKey:process.env.TEMPLATE_KEY,
        serviceKey:process.env.SERVICE_KEY,
        keyPublic:process.env.PUBLIC_KEY
    })
});

app.listen(port, () =>{
    console.log("escuchando")
});