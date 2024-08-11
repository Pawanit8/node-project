const express=require('express')
const multer=require('multer')
const path=require('path')
const dotenv = require('dotenv')
const pool = require('./src/database/db');
const user = require('./src/tables/users')
const state=require('./src/tables/states')
const city=require('./src/tables/cities')
const role=require('./src/tables/roles')
const otp=require('./src/tables/users_otps')
const firm_reg=require('./src/tables/firm_Registation')
const user_document=require('./src/tables/users_document')

dotenv.config()

const route = require('./src/routes/route')



const app=express()

app.use(express.json())
app.use('/api',route)

app.use(express.static('./upload'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.get('/',function(req,res){
    res.send("hello")
})


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`)
})

// Handle graceful shutdown
process.on('SIGINT', () => {
    pool.end(() => {
      console.log('Pool has ended');
      process.exit(0);
    });
  });