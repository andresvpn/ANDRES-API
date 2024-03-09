/* A DIVULGAÇÃO NÃO AUTORIZADA DESTE PROJETO, POR QUALQUER MEIO, É ESTRITAMENTE PROIBIDA CONFIDENCIAIS E PROPRIETÁRIAS, NÃO PODE SER DISTRUIBUIDA OU REVENDIDA. CASO HAJA VIOLAÇÃO NAS SEGUINTES CONDIÇÕES, O PROPRIETÁRIO DO PROJETO TEM O DIREITO DE TOMAR AÇÕES JUDICIAIS! */

// Módulos.
const axios = require('axios')
const cheerio = require('cheerio')
const { JSDOM } = require('jsdom')
const linkfy = require('linkifyjs')
const encodeUrl = require('encodeurl')
const fetch = require('node-fetch')
const qs = require("qs")

// Tiktok Download - Feita por Vitinho ️🤸🏻‍♂️
async function TiktokDownload(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });
  const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");};
async function shortener(url) {
  return url;}
  result = {};
  result.legenda = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.videoSemWt = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.videoOriginal = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumb = await shortener(response.data.cover);
  return result;
}

// PlayStoreSearch - Feita por Vitinho ️🤸🏻‍♂️
const playStoreSearch = (query) => new Promise((resolve, reject) => {
  axios.get(`https://play.google.com/store/search?q=${query}&c=apps`, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    }
  })
  .then((res) => {
    const $ = cheerio.load(res.data);
    const dados = [];
    $('.VfPpkd-aGsRMb').each((i, e) => {
      dados.push({
        aplicativo: $(e).find('.DdYX5:first').text(),
        thumbApp: ($(e).find('img:first').attr('srcset') ? (linkfy.find($(e).find('img:first').attr('srcset'))?.pop()?.href || $(e).find('img:first').attr('src')) : $(e).find('img:first').attr('srcset')) || $(e).find('img:last').attr('srcset') ? (linkfy.find($(e).find('img:last').attr('srcset'))?.pop()?.href || $(e).find('img:last').attr('src')) : $(e).find('img:last').attr('srcset'),
        desenvolvedor: $(e).find('.wMUdtb:first').text(),
        estrelas: $(e).find('.w2kbF:first').text(),
        linkApp: 'https://play.google.com' + $(e).find('a:first').attr('href')
      })
    })
    resolve({status: res.status, resultado: dados})
  })
  .catch(e => reject(e))
})

// OpenAi - ChatGPT - Feita por Vitinho ️🤸🏻‍♂️
OPENAI_KEY = "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" // Para utilizar os recursos da OpenAi é necessário essa definição para puxar a resposta, então não apague.

const InArtificial = async (query) => {
let response = await fetch('https://api.openai.com/v1/completions', {
  method: "POST",
  headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
     Authorization: "Bearer " + OPENAI_KEY,
    },
    body: JSON.stringify({
       model: "text-davinci-003",
       prompt: query,
       max_tokens: 2048, // Tamanho da resposta gerada pela openai.
       temperature: 0.9, // Criatividade da resposta gerada pela openai.
  }),
})
let openai = await response.json()
let result = []
result.push({
  Pergunta: query,
  Resposta: openai.choices[0].text.trim()
})
return result
}

const CorretorOpenAi = async (query) => {
let response = await fetch('https://api.openai.com/v1/completions', {
  method: "POST",
  headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
     Authorization: "Bearer " + OPENAI_KEY,
    },
    body: JSON.stringify({
       model: "text-davinci-003",
       prompt: `Corrija gramaticalmente uma frase para o português brasileiro tradicional:\n${query}`,
       max_tokens: 2048, // Tamanho da resposta gerada pela openai.
       temperature: 0.9, // Criatividade da resposta gerada pela openai.
  }),
})
let openai = await response.json()
let hasil = []
hasil.push({
  TextoOriginal: query,
  TextoCorrigido: openai.choices[1].text.trim()
})
return hasil
}

module.exports = { TiktokDownload, playStoreSearch, InArtificial, CorretorOpenAi }
