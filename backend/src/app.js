const express = require('express')
const {sequelize} = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync().then(() => {
    app.listen(config.port || 8080)
    console.log(`Server started.`)
})
