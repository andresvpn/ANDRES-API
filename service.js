__path = process.cwd()
var express = require('express');
var cors = require('cors');
var secure = require('ssl-express-www');
const { Tiktok, shortener } = require("./lib/tiktok");
var app = express();
app.use(express.json());
app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))


///TIKTOK DOWNLOADER
app.use(express.urlencoded({ extended: true }));
app.get("/tiktokdownloader", (req, res) => {
  res.sendFile(__dirname + "/view/tiktok.html");
});

app.post("/search", async (req, res) => {
     const urlInput = req.body.url;
   
     try {
       const result = await Tiktok(urlInput);
       const html = tiktok(result);
       res.send(html);
     } catch (error) {
       console.error(error);
       res.status(500).send("<h3>Error al buscar.</h3>");
     }
   });
   
function tiktok(result) {
     return `
       <div class="image-panel">
         <img src="${result.thumbnail}" alt="Imagen">
         <div class="image-details">
           <h2>AUTOR: ${result.author}</h2>
           <p>TITULO: ${result.title}</p>
           <a href="${result.nowm}" class="mediafire-button" download="tiktok">Descargar</a>
         </div>
       </div>
     `;
   }
/////
///YOUTUBE-PLAY - DOWNLOAD
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/service.html");
})
app.get("/youtube", (req, res) => {
  res.sendFile(__dirname + "/view/youtube.html");
});

app.get("/traductor", (req, res) => {
  res.sendFile(__dirname + "/view/traductor.html");
});


app.get("/spotify", (req, res) => {
res.sendFile(__dirname + "/view/spotify.html");
})

app.get("/aptoide", (req, res) => {
res.sendFile(__dirname + "/view/aptoide.html");
})

/////
module.exports = app