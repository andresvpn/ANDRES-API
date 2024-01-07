__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/view/home.html')
})
router.get('/docs', (req, res) => {
    res.sendFile(__path + '/view/docs.html')
})

router.get('/blog', (req, res) => {
    res.sendFile(__path + '/view/blog.html')
})

router.get('/docs2', (req, res) => {
res.sendFile(__path + '/docstest.html')
})

router.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : '/',
            creador: "ANDRES-VPN",
            contacto: "wa.me/573043603261"
        }
    }
    res.json(config)
})

module.exports = router