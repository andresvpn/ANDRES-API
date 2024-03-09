
const axios = require("axios")
exports.getBuffer = async (url, options) => {
    try {
  options ? options : {}
  let res = axios({
    method: "get",
    url,
    headers: {
      'DNT': 1,
      'Upgrade-Insecure-Request': 1
    },
    ...options,
    responseType: 'arraybuffer'
  })
    return res.data
    } catch (err){
      return err
    }
}