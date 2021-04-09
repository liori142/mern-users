const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const PORT = 8083;
const db = require('./DB')


db.on('error',()=>{console.log('error in connection')})

app.listen(PORT,()=>{
    console.log(`working on prot ${PORT} `)
})

app.get('/',(req,res)=>{
    res.send('api is working fine!')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())
app.use('/users',router);