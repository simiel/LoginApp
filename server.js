const express = require('express')
const path = require('path')
const knex = require('knex')
const bodyParser = require('body-parser')


app = express()

let initialPath = path.join(__dirname, "public")

app.use(bodyParser.json())
app.use(express.static(initialPath))

// endpoints
app.get('/', (req,res) => {
    res.sendFile(path.join(initialPath,"index.html"))
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(initialPath,"login.html"))
})
app.get('/register', (req,res) => {
    res.sendFile(path.join(initialPath,"register.html"))
})



app.listen(3000, (req,res) => {
    console.log('listening on port 3000 ... I am tired')
})