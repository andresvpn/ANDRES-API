let fetch = require('node-fetch')
let fs = require("fs")
let FormData = require('form-data')

function TelegraPh(Path) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
        try {
            const form = new FormData();
            form.append("file", fs.createReadStream(Path))
            const response = await fetch("https://telegra.ph/upload", {
                method: 'POST',
                body: form,
            });
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.error || 'Failed to upload');
            }
            return resolve("https://telegra.ph" + data[0].src);
        } catch (err) {
            return reject(err instanceof Error ? err : new Error(String(err)));
        }
    });
}

module.exports = TelegraPh;