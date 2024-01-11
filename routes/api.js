const {getBuffer} = require("../config")
__path = process.cwd()
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


//---MSG-PREDETERMINADOS---\\
var creador = "ANDRES-VPN"
//--- LIMIT APIKEY ---\\
var apilist = ["andres", "escanor"];



var estado = {
    402: {
    creador: creador,
    error: "402",
    mensage: "digite el parametro [apikey]"
  },
    403: {
      creador: creador,
      error: "502",
      mensage: "apikey invalida, o limite superado, para saber sulimite visita el menu",
      contacto: "wa.me/573043603261" ,
    },
}///respuestas 





router.get('/play', async (req, res, next) => {
  var apikey = req.query.apikey;
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)){
    var ii = await yts(text)
    var i =  ii.all[0]
    var q = "128kbps"
    var v = i.url
    var y = await youtubedl(v).catch(async (_) => youtubedlv2(v))
    var url = await y.audio[q].download()
    var url2 = await getBuffer(url)
    var titulo = i.title
    var view = i.views
    var duracion = i.timestamp
    var ago = i.ago
    var link_youtube = i.url
    var id = i.videold
    var img = i.thumbnail
    res.json({
      creador: creador,
      estado: true,
      result: {
        tipo: "mp3",
        titulo,
        view,
        duracion,
        ago,
        link_youtube,
        id,
        img,
        url,
        url2
      }
    })
  } else {
    res.json(estado[403])
  } 
})

router.get('/playvid', async (req, res, next) => {
  var apikey = req.query.apikey;
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)){
var ii = await yts(text)
var i = ii.all[0]
var qu = '360'
var q = qu + 'p'
var v = i.url
var y = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
var url = await y.video[q].download()
var titulo = i.title
var view = i.views
var duracion = i.timestamp
var ago = i.ago
var link_youtube = i.url
var id = i.videold
var img = i.thumbnail
res.json({
  creador: creador,
  estado: true,
  result: {
    tipo: "mp4",
    titulo,
    view,
    duracion,
    ago,
    link_youtube,
    id,
    img,
    url,
  }
  })
  } else {
    res.json(estado[403])
  }
})

router.get('/ytaudio', async (req, res, next ) => {
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
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
    res.json(estado[403])
  }
})

router.get('/ytvideo', async (req, res, next ) => {
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
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
    res.json(estado[403])
  }
})

router.get('/mediafire', async (req, res, next ) => {
  var apikey = req.query.apikey
  var url = req.query.url
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
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
    res.json(estado[403])
  }
})

router.get('/apk', async (req, res, next) => {
  var apikey = req.query.apikey
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
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
    res.json(estado[403])
  }
})

router.get('/imagen', async (req, res, next) => {
  var apikey = req.query.apikey
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
  var i = await googleImage(text)
  var andres = i[Math.floor(Math.random() * i.length)]
  var ii = andres
  var dataa = await fetch(ii).then(v => v.buffer())
  await fs.writeFileSync(__path + '/img/sex.jpg', dataa)
  res.sendFile(__path + '/img/sex.jpg')
  } else {
    res.json(estado[403])
  } 
})

router.get('/lyrics', async (req, res, next) => {
  var apikey = req.query.apikey
  var text = req.query.text
  if(!apikey) throw res.json(estado[402])
  if(apilist.includes(apikey)) {
    var i = await  lyricsv2(text).catch(async _ => await lyrics(text))
    var titulo = i.title
    var autor = i.author
    var link = i.link
    var letra = i.lyrics
    res.json({
      creador: creador,
      estador: true,
      result: {
        titulo,
        autor,
        link,
        letra,
      }
    })
  } else {
    res.json(estado[403])
  }
})

router.get('/hentai', async (req, res, next) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.json(precisos.digitarapikey)
  if (apilist.includes(apikey)) {
    var h = JSON.parse(fs.readFileSync("./json/hentai.json"))
    var link = h[Math.floor(Math.random() * h.length)];
    data = await fetch(link).then(v => v.buffer())
    await fs.writeFileSync(__path + '/img/sex.jpg', data)
    res.sendFile(__path + '/img/sex.jpg')
      
      } else {
        res.json(estado[403])
      }
    })

    router.get('/tiktokvideo', async (req, res, next) => {
      var apikey = req.query.apikey
      var url = req.query.url
      if(!url.includes("tiktok")) throw res.json({
        creador: creador,
        error: "link invalido!!",
      })
      if(apilist.includes(apikey)) {
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
        res.json(estado[403])
      } 
    })

    router.get('/tiktokaudio', async (req, res, next) => {
      var apikey = req.query.apikey
      var url = req.query.url
      if(!url.includes("tiktok")) throw res.json({
        creador: creador,
        error: "link invalido!!",
      })
      if(apilist.includes(apikey)) {
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
        res.json(estado[403])
      } 
    })
    
 router.get('/facebook', async (req, res, next) => {
  var apikey = req.query.apikey
  var url = req.query.url
   if(!apikey) return res.json(estado[402])
   if(apilist.includes(apikey)) {
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
 } else {
    res.json(estado[403])
  }
 }) 
 
 
 
 
 router.get('/xnxxsearch', async (req, res, next) => {
 var apikey = req.query.apikey
 var text = req.query.text
 if(!apikey) return res.json(estado[402])
 if(apilist.includes(apikey)) {
 var query = text
   var ii = await xnxxsearch(query)
   var resul = ii.result
   
   for (let o of resul) {
var lo = 1; 
resultadoooo = {
     No: lo++,
     titulo: o.title,
     info: o.info,
     url: o.link,
     }
    
     res.json({
     creador: creador,
     estado: true,
     result: resultadoooo
     })
 }
 } else {
    res.json(estado[403])
  }
 })
 
 
router.get('/pokemon', async (req, res, next) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.json(estado[402])
  if (apilist.includes(apikey)) {
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
  res.json(estado[403])
  }
})

module.exports = router
