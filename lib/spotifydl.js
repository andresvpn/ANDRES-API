const SpotifyFetcher = require('spotifydl-core').default;

const spotify = new SpotifyFetcher({
    clientId: "a7629c96c0744389833101d545d0a1ec", 
    clientSecret: "0646901d410e43eda5b89c6df9b1941c"
});

/* [Scrapper | Spotify] - Créditos: Victor Gabriel */
async function spotifydl(url) { 
    return new Promise(async (resolve, reject) => { 
        try { 
            const res = await spotify.getTrack(url); 
            const timeoutPromise = new Promise((_, reject) => { 
                setTimeout(() => { 
                    reject(new Error('Tempo esgotado.')); 
                }, 300000); 
            }); 
            const audioPromise = spotify.downloadTrack(url); 
            let audio = await Promise.race([audioPromise, timeoutPromise]); 

            resolve({ data: res, audio }); 
        } catch (error) { 
            reject(error); 
        } 
    }); 
}

/* Final da scrapper, agora vamos finalizar com a exportação do arquivo, exemplos:
    const { spotifydl } = require("./base de dados/spotifydl.js")
    const spotify = require("./base de dados/spotifydl.js") 
*/

module.exports = { spotifydl };