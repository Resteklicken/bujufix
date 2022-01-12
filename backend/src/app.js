const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

console.log("Hello, benis!")

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'Hello, world!'
    })
})

app.post('/showPug', (req, res) => {
    /*res.send({
        message: `Your message was ${req.body.message}`
    })*/
    //console.log("req received")
    res.sendFile('/backend/src/assets/pug.jpg')
})
app.listen(process.env.PORT || 8080)