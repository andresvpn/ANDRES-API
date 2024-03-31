var express = require('express');
var cors = require('cors');
const path = require('path');
var secure = require('ssl-express-www');
const fs = require('fs');
const { Tiktok, shortener } = require("./lib/tiktok");
const PORT = process.env.PORT || 8080 || 3000
const { newuser, newgold, saldo, menosgold, loadDatabase, userExists, saveDatabase } = require('./database/database.js');
loadDatabase()
const key = ["1088829889"]
var menu = require('./routes/main')
var api = require('./routes/api')
var service = require('./service')
const app = express();

app.use(express.json());

app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))
app.get("/andresvpn", (req, res) => {
res.sendFile(__dirname + "/view/bio.html");
})
app.use('/', menu)
app.use('/api', api)
app.use('/service', service)
app.get('/panel', (req, res) => {
     var apikey = req.query.apikey
     if(!apikey) throw res.json({error: "ingresa la clave de acceso"})
     if(key.includes(apikey)) {
     const filePath = path.join(__dirname, './view/panel.html');
     res.sendFile(filePath);
} else {
     res.json({error: "clave de acceso incorrecta"})
   }
 })

app.post('/panelconfig/newuser', (req, res) => {
     const { username } = req.body;
     const result = newuser(username);
     res.send(result);
   });
   
app.post('/panelconfig/newgold', (req, res) => {
     const { username, amount } = req.body;
     const result = newgold(username, amount);
     res.send(result);
   });
   
app.post('/panelconfig/menosgold', (req, res) => {
     const { username, amount } = req.body;
     const result = menosgold(username, amount);
     res.send(result);
   });
   
   app.post('/panelconfig/saldo', (req, res) => {
     const { username } = req.body;
     const result = saldo(username);
     res.send(result);
   });
   

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/view/error404.html'));
});




function limpiarDirectorio() {
    const directorio = './spotify/';
    fs.readdir(directorio, (err, archivos) => {
        if (err) {
            console.error('Error al leer el directorio:', err);
            return;
        }

        archivos.forEach(archivo => {
            const rutaArchivo = path.join(directorio, archivo);
            fs.unlink(rutaArchivo, err => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                } else {
                    console.log('Archivo eliminado correctamente:', archivo);
                }
            });
        });
    });
}

function limpiarDirectorio1() {
    const directorio = './temp/';
    console.clear()
    fs.readdir(directorio, (err, archivos) => {
        if (err) {
            console.error('Error al leer el directorio:', err);
            return;
        }

        archivos.forEach(archivo => {
            const rutaArchivo = path.join(directorio, archivo);
            fs.unlink(rutaArchivo, err => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                } else {
                    console.log('Archivo eliminado correctamente:', archivo);
                }
            });
        });
    });
}
var time = 10//minutos para llegar mpiar directorios
setInterval(limpiarDirectorio, time * 60 * 1000)
setInterval(limpiarDirectorio1, time * 60 * 1000)

   

const os = require('os');
try{
function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const interface of interfaces[key]) {
      if (!interface.internal && interface.family === 'IPv4') {
        return interface.address;
      }
    }
  }
  return '127.0.0.1'; // Por si no se encuentra ninguna dirección IP válida
}
} catch (e){
console.log(e)
}

const ipAddress = getIPAddress();
module.exports = app
app.listen(PORT, () => {
     const { GREEN, BLUE, RED, WHITE } = require('./lib/color.js');
     console.log(`${BLUE}SERVIDOR FUNCIONANDO EN PUERTO:` + PORT + `\n ip: ${ipAddress}` + `${WHITE}`)
});