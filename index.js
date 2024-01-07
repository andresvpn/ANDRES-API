var express = require('express');
var cors = require('cors');
var secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000


var menu = require('./routes/main')
var api = require('./routes/api')

var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', menu)
app.use('/api', api)

app.listen(PORT, () => {
const{ GREEN, BLUE, RED, WHITE, } = require('./lib/color.js')
    
     
     console.log(`${BLUE}SERVIDOR FUNCIONANDO EN PUERTO:` + PORT)
    
    
})

module.exports = app
