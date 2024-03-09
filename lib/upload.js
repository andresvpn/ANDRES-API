const axios = require('axios');
const fs = require('fs');


function ssweb(url, outputPath) {
let device = 'desktop'
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com';
        const param = {
            url: url,
            device: device,
            cacheLimit: 0
        };
        axios({
            url: base + '/capture.php',
            method: 'POST',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((data) => {
            const cookies = data.headers['set-cookie'];
            if (data.data.status == 'success') {
                axios.get(base + '/' + data.data.link, {
                    headers: {
                        'cookie': cookies.join('')
                    },
                    responseType: 'arraybuffer'
                }).then(({ data }) => {
                    fs.writeFile(outputPath, data, 'binary', (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            } else {
                reject(new Error('Error al capturar la pantalla'));
            }
        }).catch(reject);
    });
}

module.exports = ssweb