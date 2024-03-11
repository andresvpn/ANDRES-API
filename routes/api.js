

const {getBuffer} = require("../config")
const { newuser, newgold, saldo, menosgold, totalapis, totaluser, userExists, loadDatabase, saveDatabase } = require('../database/database.js');
const path = require("path")
loadDatabase()
__path = process.cwd()
const user = userExists
var express = require("express");
const  axios = require("axios")
var router = express.Router();
var fs = require("fs");
var util = require("util");
var FormData = require("form-data");
var fetch = require("node-fetch");
//------DOWNLOAD------\\
const yts = require("youtube-yts");
const{youtubedl, youtubedlv2, googleImage, lyrics, lyricsv2, mediafiredl} = require("@bochilteam/scraper")
const{xnxxsearch} = require("../lib/xnxx.js");

async function acortar(url) {
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
    const acortado = response.data;
    return acortado
}
//---MSG-PREDETERMINADOS---\\
const creador = "ANDRES-VPN"

var estado = {
    402: {
    creador: creador,
    error: "402",
    mensage: "digite el parametro [apikey]"
  },
    403: {
      creador: creador,
      error: "403",
      mensage: "usuario no existe",
      contacto: "wa.me/573043603261" ,
    },
    405: {
      creador: creador,
      error: "405",
      mensage: "limite superado",
      contacto: "wa.me/573043603261" ,
    },
    500: {
    creador: creador,
    error: "500",
    mensage: "error interno en el servidor",
    contacto: "wa.me/573043603261" ,
    }
}///respuestas



router.get('/ssweb', async (req, res, next) => {
try{
    const apikey = req.query.apikey;
    const url = req.query.url;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
      menosgold(apikey, 1);
      
      var ssweb = require("../lib/upload")
      var ruta = path.join(__dirname, '../temp', `captura.png`);
      var urlDescarga = `${req.protocol}://${req.get('host')}/api/download-ssweb?file=${encodeURIComponent(ruta)}`;
      ssweb(url, ruta)
    .then(() => {
    res.json({
    creador: creador,
    status: true,
    result: urlDescarga
    })
    })
      ///
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});


router.get('/download-ssweb', (req, res) => {
try {
    var file = req.query.file;
    var filePath = path.resolve(file);    
    var spotifyFolderPath = path.resolve(__dirname, '../temp');
    if (filePath.startsWith(spotifyFolderPath)) {
        // Si está dentro de la carpeta permitida, enviar el archivo como descarga
        res.download(filePath);
    } else {
        // Si el archivo está fuera de la carpeta permitida, enviar un error
        res.status(403).send('Forbidden');
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});

router.get('/spotify', async (req, res) => {
try {
    var apikey = req.query.apikey;
    var text = req.query.text;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
        if (saldo(apikey) >= 1) {
            menosgold(apikey, 1);

            var lupa = [];
            
            var { searching } = require("../lib/spotify-search");
            var { spotifydl } = require("../lib/spotifydl");

            if (text.includes("https://open.spotify.com")) {
                lupa.push(text);
            } else {
                let rest = await searching(text);
                lupa.push(rest.data[0].url);
            }
            var v = lupa[0];
            var result = await spotifydl(v);
            var ress = result.data;

            var archivoBuffer = result.audio; // Suponiendo que 'audio_buffer' contiene el buffer del audio

          var ruta = path.join(__dirname, '../spotify', `${ress.name}.mp3`); // Ruta donde guardar el archivo
         
            fs.writeFileSync(ruta, archivoBuffer); // Guardar el archivo

            var urlDescarga = `${req.protocol}://${req.get('host')}/api/download-spotify?file=${encodeURIComponent(ruta)}`;

            res.json({
                creador: creador,
                status: true,
                result: {
                    title: ress.name,
                    author: ress.artists,
                    album: ress.album_name,
                    data: ress.release_date,
                    thumb: ress.cover_url,
                    url: urlDescarga,
                },
            });
        } else {
            res.json(estado[405]);
        }
    } else {
        res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});


router.get('/download-spotify', (req, res) => {
try{
    var file = req.query.file;
    var filePath = path.resolve(file);    
    var spotifyFolderPath = path.resolve(__dirname, '../spotify');
    if (filePath.startsWith(spotifyFolderPath)) {
        // Si está dentro de la carpeta permitida, enviar el archivo como descarga
        res.download(filePath);
    } else {
        // Si el archivo está fuera de la carpeta permitida, enviar un error
        res.status(403).send('Forbidden');
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});

router.get('/spotify-search', async (req, res, next) => {
try{
    var apikey = req.query.apikey;
    var text = req.query.text;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
        menosgold(apikey, 1);
        //
        var { searching, getInfo } = require("../lib/spotify-search")
        const result = await searching(text)
        res.json({
        creador: creador,
        status: true,
        result: result.data
        })
        
        //
        
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});


router.get('/limite-apikey', async (req, res, next) => {
try{
  var apikey = req.query.apikey;
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)){
    var apikey = apikey
    var limit = saldo(apikey)
    var total_search_apikey = totalapis(apikey)
    var total_search_users = totaluser()
    res.json({
      creador: creador,
      stado: true,
      result: {
        apikey: apikey,
        limite: limit,
        total_search_apikey,
        total_search_users
      }
    })
  } else {
    res.json(estado[403])
  }
  } catch (e) {
  res.json(estado[500]);
    console.log(e)
  }
})


    
router.get('/xnxxdl', async (req, res, next) => {
try{
    const apikey = req.query.apikey;
    const url = req.query.url;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
        menosgold(apikey, 1);
        let{ xnxxdl } = require("../lib/xnxx.js")
xnxxdl(url)
.then((result) => {
var highQualityVideoUrl = result.result.files.high;
var title = result.result.title;
var duration = result.result.duration;
var numero = duration/60
var decimal = numero.toFixed(2);
var minutos = decimal.replace(".", ":");
    res.json({
    creador: creador, 
    estado: true,
    resutl: {
    title,
    minutos,
    url: highQualityVideoUrl
    }
          });
          })
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});




router.get('/xnxx-search', async (req, res, next) => {
try{
    var apikey = req.query.apikey;
    var text = req.query.text;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
        menosgold(apikey, 1);

var xnxxResult = await xnxxsearch(text);
    var porno = xnxxResult.result;

    var videoArray = porno.map((o, index) => {
      return {
        index: index + 1,
        title: o.title,
        url: o.link,
      };
    });
    

    res.json({
    creador: creador, 
    estado: true,
    resutl: videoArray
          });
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});


router.get('/yt-search', async (req, res, next) => {
try{
    var apikey = req.query.apikey;
    var text = req.query.text;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
        menosgold(apikey, 1);
       var results = await yts(text);
      var videoArray = results.all.map(video => {
      return {
        title: video.title,
        view: video.views,
        timestamp: video.timestamp,
        ago: video.ago,
        id: video.videoId,
        thumbnail: video.thumbnail,
        url: video.url,  
      };
    });

    res.json({
    creador: creador, 
    estado: true,
    resutl: videoArray
          });
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});


router.get('/play', async (req, res, next) => {
try {
    var apikey = req.query.apikey;
    var text = req.query.text;
    if (!apikey) throw res.json(estado[402]);
    if (user(apikey)) {
      if (saldo(apikey) >= 1) {
        menosgold(apikey, 1);
        var { playyts } = require("../lib/ytdl");
        var resultadoo = await playyts(text);
        var {
          title,
          views,
          likes,
          dislike,
          channel,
          uploadDate,
          thumb,
          mp4,
          mp3,
          quality,
          desc,
        } = resultadoo;

        // Envía la respuesta JSON
        res.json({
          creador: creador, 
          estado: true,
          result: {
            title,
            views,
            channel,
            uploadDate,
            quality,
            thumb,
            mp4,
            mp3,
            dc: {
            desc
            }
          }
        });
      } else {
        res.json(estado[405]);
      }
    } else {
      res.json(estado[403]);
    }
    } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
});



router.get('/ytaudio', async (req, res, next ) => {
try {
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
    var q = "128kbps"
    var y = await youtubedl(url).catch(async (_) => await youtubedlv2(url))
    var link = await y.audio[q].download()
    var titulo = y.title
    var thumbnail = y.thumbnail
    var id = y.id
    res.json({
      creador: creador,
      estado: true,
      result: {
        tipo: "mp3",
        titulo,
        id,
        thumbnail,
        link
      }
    }) 
  } else {
    res.json(estado[405])
  }
  } else {
    res.json(estado[403])
  }
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})

router.get('/ytvideo', async (req, res, next ) => {
try{
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
    var qu = '360'
    var q = qu + 'p'
    var y = await youtubedl(url).catch(async (_) => await youtubedlv2(url))
    var url = await y.video[q].download()
    var titulo = y.title
    var thumbnail = y.thumbnail
    var id = y.id
    res.json({
      creador: creador,
      estado: true,
      result: {
      tipo: "mp4",
      titulo,
      thumbnail,
      id,
      url,
      }
    })
  } else {
    res.json(estado[405])
  }
  } else {
    res.json(estado[403])
  }
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})

router.get('/mediafire', async (req, res, next ) => {
try {
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1){
    menosgold(apikey, 1)
    var i = await mediafiredl(url)
    var titulo = i.filename
    var size = i.filesizeH
    var tipo = i.ext
    var filetype = i.filetype
    var link = i.url
    var link2 = i.url2 
    res.json({
      creador: creador,
      estado: true,
      result: {
        titulo,
        size,
        tipo,
        filetype,
        link,
        link2,
      }
    })
  } else {
    res.json(estado[405])
  }
  } else {
    res.json(estado[403])
  }
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    } 
})

router.get('/apk', async (req, res, next) => {
try{
  var apikey = req.query.apikey
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1){
      menosgold(apikey, 1)
    var{ search, download} = require("aptoide-scraper")
    var busqueda = await search(text)
    var i = await download(busqueda[0].id)
    var nombre = i.name
    var package = i.package
    var lastup = i.lastup
    var size = i.size
    var icon = i.icon
    var link = i.dllink
    res.json({
      creador: creador,
      estado: true,
      result: {
        nombre,
        package,
        lastup,
        size,
        icon,
        link
      }
    })
  } else {
    res.json(estado[405])
  }
  } else {
    res.json(estado[403])
  }
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})


router.get('/traductor', async (req, res, next) => {
try{
  var apikey = req.query.apikey
  var text = req.query.text
  var lang = req.query.lang
  if(!text) throw res.json({error: "ingresa un texto" })
  if(!lang) throw res.json({error: "ingresa a que lenguaje al que lo quieres traducir" })
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${text}`)
    .then(response => response.json())
    .then(data => {
        var resultt = data[0][0][0];
        res.json({
        creador: creador,
        status: true,
        result: {
        lang: lang,
        result: resultt
        }
        })
        
    })
    
  } else {
    res.json(estado[405])
  }
  } else {
    res.json(estado[403])
  }
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})
router.get('/imagen', async (req, res, next) => {
try{
  var apikey = req.query.apikey
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
  var i = await googleImage(text)
  var andres = i[Math.floor(Math.random() * i.length)]
  var ii = andres
  var dataa = await fetch(ii).then(v => v.buffer())
  await fs.writeFileSync(__path + '/img/sex.jpg', dataa)
  res.sendFile(__path + '/img/sex.jpg')
    } else {
      res.json(estado[405])
    }
  } else {
    res.json(estado[403])
  } 
  } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})


router.get('/hentai', async (req, res, next) => {
try {
  var apikey = req.query.apikey;
  if (!apikey) return res.json(precisos.digitarapikey)
  if (user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
    var h = JSON.parse(fs.readFileSync("./json/hentai.json"))
    var link = h[Math.floor(Math.random() * h.length)];
    daa = await fetch(link).then(v => v.buffer())
    await fs.writeFileSync(__path + '/img/sex.jpg', daa)
    res.sendFile(__path + '/img/sex.jpg')
    }
    else{
      res.json(estado[405])
    }
      } else {
        res.json(estado[403])
      }
      } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
    })
    router.get('/tiktokvideo', async (req, res, next) => {
    try {
      var apikey = req.query.apikey
      var url = req.query.url
      if(!url.includes("tiktok")) throw res.json({
        creador: creador,
        error: "link invalido!!",
      })
      if(user(apikey)) {
        if(saldo(apikey) >= 1){
           menosgold(apikey, 1)
        require("../lib/tiktok").Tiktok(url).then( data => {
          var titulo = data.title
          var author = data.author
          var thumbnail = data.thumbnail
          var url_nowm = data.nowm
          var url_wm = data.watermark
          res.json({
            creador: creador,
            estador: true,
            result:{
              titulo,
              author,
              thumbnail,
              url: {
              url_nowm,
              url_wm
              }
            }
          })
          }) 
        } else {
          res.json(estado[405])
        }
      } else {
        res.json(estado[403])
      } 
      } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
    })

    router.get('/tiktokaudio', async (req, res, next) => {
    try {
      var apikey = req.query.apikey
      var url = req.query.url
      if(!url.includes("tiktok")) throw res.json({
        creador: creador,
        error: "link invalido!!",
      })
      if(user(apikey)) {
        if(saldo(apikey) >= 1){
          menosgold(apikey, 1)
        require("../lib/tiktok").Tiktok(url).then( data => {
          var titulo = data.title
          var author = data.author
          var thumbnail = data.thumbnail
          var audio = data.audio
          res.json({
            creador: creador,
            estador: true,
            result:{
              titulo,
              author,
              thumbnail,
              audio
            }
          })
          }) 
        } else {
          res.json(estado[405])
        }
      } else {
        res.json(estado[403])
      }  
      } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
    })
    
 router.get('/facebook', async (req, res, next) => {
 try {
  var apikey = req.query.apikey
  var url = req.query.url
   if(!apikey) return res.json(estado[402])
   if(user(apikey)) {
    if(saldo(apikey) >= 1){
      menosgold(apikey, 1)
       require("../lib/facebook.js").facebook(url).then( data => {
        var video_normal = data.Normal_video
        var video_hd = data.HD
        var audio = data.audio
        
          res.json({
          creador: creador,
          estado: true,
          result: {
          video_normal: video_normal,
          video_hd: video_hd,
          audio: audio
          } 
          })
        })
      }else {
        res.json(estado[405])
      }
 } else {
    res.json(estado[403])
  }
   
      } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
    }) 
 
 router.get('/gpt', async (req, res, next) => {
 try {
  var apikey = req.query.apikey
  var text = req.query.text
  if (!apikey) return res.json(estado[402])
  if(user(apikey)) {
    if(saldo(apikey) >= 1) {
      menosgold(apikey, 1)
      var{InArtificial} = require("../lib/scrapper-vip")
      var i = await InArtificial(text)
      var result = i.result.Resposta
      res.json({
        creador: creador,
        estado: true,
        result: result
      })
    } else {
      res.json(estado[405])
    }
  } else {
    res.json(estado[403])
  }
   
      } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
 })

 
 
 
router.get('/pokemon', async (req, res, next) => {
try {
  var apikey = req.query.apikey;
  if (!apikey) return res.json(estado[402])
  if (user(apikey)) {
    if(saldo(apikey) >= 1){
      menosgold(apikey, 1)
    var ala = [
      "Pokémon tiene apoyo y aprobación por parte del Vaticano",
      "Pikachu ocupó el segundo lugar en la lista “The Best People of 1999",
      "La evolución de Magikarp está basada en una leyenda china",
      "Los entrenadores Pareja Joven usan Pokémon que se complementan entre ellos",
      "Poliwhirl es el Pokémon favorito de Satoshi Tajiri", " Las películas de Pokémon siempre se estrenan en julio",
      "Las cartas de Pokémon fueron prohibidas en Arabia Saudí",
      "Los Pokémon son una clase de criaturas inspiradas en animales reales, insectos, objetos, plantas o criaturas mitológicas.",
      "Al inicio eran 150 criaturas y hoy son más de 700.",
      "Pokémon tiene el acento en la sílaba “ké”, aunque muchos lo pronuncian en la sílaba “mon”.",
      "La Pokédex es una enciclopedia electrónica portátil que sirve para registrar automáticamente las fichas de todas las diversas especies Pokémon vistas y capturadas durante el viaje como entrenadores.",
      "En la etapa inicial del concepto su nombre era “Capsule Monster“",
      " Existe un avión Boeing 747 japonés decorado con dibujos de Pokémon.",
      "Un grupo de investigadores de la universidad de Osaka descubrió una proteína que sirve para transmitir la información visual al cerebro de manera más rápida y fue nombrada “Pikachurina” por la agilidad del pokémon Pikachu.",
      "El objetivo final del juego es llegar a ganar la Liga Pokémon y convertirse en el campeón regional",
      "Las evoluciones de los pokémon son transformaciones que cambian y/o mejoran algunas de sus habilidades y características.",
      "La evolución es irreversible, es decir, que el Pokémon evolucionado nunca podrá volver a su etapa anterior.",
      "Los entrenadores reciben un pokémon inicial o principiante para poder comenzar con su trayecto en el juego como regalo por parte del “profesor local”",
      "existe un debate en torno a cuál es el pokémon más poderoso, muchos consideran que es Arceus, el dios Pokémon.",
      "Aunque la mayoría de los Pokémon tienen al menos una evolución disponible, también existen Pokémon sin cadena evolutiva."
    ]
    var result = JSON.parse(fs.readFileSync("./json/pokemon.json"))
    var info = ala[Math.floor(Math.random() * ala.length)];
        res.json({
          creador: creador,
          estado: true,
          audio: 'https://www.cjoint.com/doc/23_08/MHvaeHOsk4I_ttsmaker-file-2023-8-20-18-24-49.mp3',
          audiobr: 'https://www.cjoint.com/doc/23_08/MHvaoFCDzLI_ttsmaker-file-2023-8-20-19-6-5.mp3',
          info,
          result,
        })
      } else {
        res.json(estado[405])
      }
  } else {
  res.json(estado[403])
  }
        } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})
 
  
module.exports = router

