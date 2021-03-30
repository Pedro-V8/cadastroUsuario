const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

require('./controllers/authController')(app)
require('./controllers/projectController')(app)

app.listen(3333 , (req , res) => {
    console.log('Servidor rodando')
})