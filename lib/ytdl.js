

const ytdl = require('ytdl-core');
const yts2 = require("youtube-yts")
const axios = require('axios');



function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) resolve(`${bytes} ${sizes[i]}`);
        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
    });
  };

async function playyts(text) {
    return new Promise(async(resolve, reject) => {
        let andres = await yts2(text)
        let andresvpn = andres.all[0]
  let v = [];
  if (text.includes("https://youtu.be")) {
    v.push(text);
  } else {
    v.push(andresvpn.url);
  }
  let lupa = v[0]
        ytdl.getInfo(lupa).then(async(getUrl) => {
            let resultt = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    resultt[i] = {
                        video: item.url,
                        quality: qualityLabel,
                        size: bytes
                    };
                };
            };
            let resultFix = resultt.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = getUrl.videoDetails.viewCount;
            let likes = getUrl.videoDetails.likes;
            let dislike = getUrl.videoDetails.dislikes;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            let resultado = await ytMp3(lupa);
            let resultmp3 = resultado.result;
            let responsee = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
           let acortadoo1 = responsee.data;
           let responsee2 = await axios.get(`https://tinyurl.com/api-create.php?url=${resultmp3}`);
           let acortadoo2 = responsee2.data;
           let responsee3 = await axios.get(`https://tinyurl.com/api-create.php?url=${thumb}`);
           let acortadoo3 = responsee3.data;
            const resultadoo = {
                creator: 'Caliph',
                editor_mejorador: "Andres-vpn",
                title,
                mp4: acortadoo1,
                mp3: acortadoo2,
                quality: resultFix[0].quality,
                size: resultFix[0].size,
                thumb: acortadoo3,
                views,
                likes,
                dislike,
                channel,
                uploadDate,
                desc
                
            };
            resolve(resultadoo)
        }).catch(reject);
    });
};

async function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        audio: item.url,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = getUrl.videoDetails.viewCount;
            let likes = getUrl.videoDetails.likes;
            let dislike = getUrl.videoDetails.dislikes;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            
            const resultado = {
                creator: 'Caliph',
                title,
                result: resultFix[0].audio,
                size: resultFix[0].size,
                thumb,
                views,
                likes,
                dislike,
                channel,
                uploadDate,
                desc
            };
            resolve(resultado)
        }).catch(reject);
    });
}



module.exports = { playyts, ytMp3};

