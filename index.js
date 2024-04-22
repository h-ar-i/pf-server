//load .env file to process .env by default
require('dotenv').config()
const express =require('express')
const cors =require('cors')
const router = require('./Routes/router')
//connection with connection.js(mongodb atlas)
require('./Routes/Controllers/DB/connection')

//create an express application
const pfserver = express()

//use cors in express server
pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

const PORT =3000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`project fair server started @ PORT:${PORT}`);
})

//http://localhost:3000/

pfserver.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:green">project fair started and waiting for client request !!!</h1>`)
})

// pfserver.post("/",(req,res)=>{
//     res.status(200).send(`POST REQUEST`)
// })
