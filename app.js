import express from 'express';
import RSSParser from 'rss-parser';
import dotenv from 'dotenv';

const parser = new RSSParser();
const app = express();
const port = 3000;

dotenv.config();

//Definicion de las 2 fuentes RSS 
const rssFeeds =[
    {id: 'feed1', url:'https://cosmere.es/feed/'}, //RSS
    {id: 'feed2', url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC3g-w83Cb5pEAu5UmRrge-A'} //ATOM
];

//Feed RSS
//Existen 2 Feeds por lo que las rutas internas del servidor donde se almacenan son 
// /api/feed/feed1
// //api/feed/feed2
app.get('/api/feed/:id', async (req, res) =>{

    //Se obtiene un feed en funcion del id de cada uno
    const feedConfig =rssFeeds.find(feed => feed.id === req.params.id)
    try{
        //Obtenemos el feed 
        const feed =await parser.parseURL(feedConfig.url)
        //Parseamos a JSON para trabajar mas comodo con ellas
        res.json(feed);
    }catch (error){
        console.error('Error al obtener el Feed RSS', error);
        res.status(500).send('Error al Obtener el feed RSS');
    }
});

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