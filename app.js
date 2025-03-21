import express from "express";
import RSSParser from "rss-parser";
import dotenv from "dotenv";
import { Resend } from "resend";

const parser = new RSSParser();
const app = express();
const port = 3000;

dotenv.config();

//Definicion de las 2 fuentes RSS
const rssFeeds = [
  { id: "feed1", url: "https://cosmere.es/feed/" }, //RSS
  {
    id: "feed2",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC3g-w83Cb5pEAu5UmRrge-A",
  }, //ATOM
];

//Feed RSS
//Existen 2 Feeds por lo que las rutas internas del servidor donde se almacenan son
// /api/feed/feed1
// //api/feed/feed2
app.get("/api/feed/:id", async (req, res) => {
  //Se obtiene un feed en funcion del id de cada uno
  const feedConfig = rssFeeds.find((feed) => feed.id === req.params.id);
  try {
    //Obtenemos el feed
    const feed = await parser.parseURL(feedConfig.url);
    //Parseamos a JSON para trabajar mas comodo con ellas
    res.json(feed);
  } catch (error) {
    console.error("Error al obtener el Feed RSS", error);
    res.status(500).send("Error al Obtener el feed RSS");
  }
});

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  //Ruta del proyecto
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/send", async (req, res) => {
  console.log("hola");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { email } = req.body;
    //Correo para frikirender con la consulta
    const correoEmpresa = await resend.emails.send({
      from: "newsletter@frikirender.com", // Tu correo remitente
      to: email,
      subject: "Newsletter",
      html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #fff8f1">
  <div style="max-width: 600px; margin: auto; padding: 16px">
    
    <h2>Su correo ha sido registrado con exito.</h2>    
    <p>Gracias por suscribirse a nuestra newsletter</p>
  </div>
</div>`,
    });

    return res.status(200).json({ code: "200" });
  } catch (error) {
    return res.status(500).json({ code: "500" });
  }
});

app.listen(port, () => {
  console.log("escuchando");
});
