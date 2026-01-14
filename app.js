import express from "express";
import RSSParser from "rss-parser";
import dotenv from "dotenv";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from 'url';

// Configuración para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const parser = new RSSParser();
const app = express();
const port = 3000;

// Definición de las fuentes RSS
const rssFeeds = [
  { id: "feed1", url: "https://cosmere.es/feed/" },
  {
    id: "feed2",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC3g-w83Cb5pEAu5UmRrge-A",
  },
];

app.use(express.static("public"));
app.use(express.json());

// Ruta para obtener Feeds RSS
app.get("/api/feed/:id", async (req, res) => {
  const feedConfig = rssFeeds.find((feed) => feed.id === req.params.id);
  if (!feedConfig) return res.status(404).send("Feed no encontrado");

  try {
    const feed = await parser.parseURL(feedConfig.url);
    res.json(feed);
  } catch (error) {
    console.error("Error al obtener el Feed RSS", error);
    res.status(500).send("Error al obtener el feed RSS");
  }
});

// Ruta principal (Sirve el index.html)
app.get("/", (req, res) => {
  // Uso de path.join para evitar errores de rutas en diferentes SO
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para envío de correos con Resend
app.post("/api/send", async (req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = req.body;

    const { data, error } = await resend.emails.send({
      from: "newsletter@frikirender.com",
      to: email,
      subject: "Newsletter",
      html: `
        <div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #fff8f1; padding: 20px;">
          <div style="max-width: 600px; margin: auto; padding: 16px; background: white; border-radius: 8px;">
            <h2>Su correo ha sido registrado con éxito.</h2>    
            <p>Gracias por suscribirse a nuestra newsletter</p>
          </div>
        </div>`,
    });

    if (error) throw error;
    return res.status(200).json({ code: "200", data });
  } catch (error) {
    console.error("Error en Resend:", error);
    return res.status(500).json({ code: "500", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});