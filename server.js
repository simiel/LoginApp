const express = require('express')
const path = require('path')
const knex = require('knex')
const bodyParser = require('body-parser')


db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'loginapp',
    }
})

app = express()

let initialPath = path.join(__dirname, "public")

app.use(bodyParser.urlencoded({extended:true}))
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

app.post('/register-user', (req,res)=>{
    const {name, email, password} = req.body
    console.log(name)
    if(!name.length || !email.length || !password.length){
        res.json("fill all the fields")
    } else{
        db('users').insert(
            {
                name: name,
                email: email,
                password: password
            }
        )
        .returning(['name', 'email'])
        .then( data=> res.json(data[0]))
        .catch( e =>{
            if(e.detail.includes('already exists')){
                res.json('email already exists')
            }
        })
    }
    
})

app.post('/login-user', (req, res)=>{
    const {password, email} = req.body
    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(
        data => {
            if(data.length){
                res.json(data[0])
            } else{
                res.json('email or password is incorect')
            }
        }
    )
})



app.listen(3000, (req,res) => {
    console.log("listening on port 3000 ... let's geaux")
})