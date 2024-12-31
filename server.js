// package.json  
//server.js    
//.env - used to store PORT & MONGODB_URI

const express = require('express')
const app = express()
const {connect}=require('mongoose')
let{PORTT,MONGODB_URII}=require('./config/index')
const Schema=require("./schema/schema")
const {engine}=require('express-handlebars')
const routing=require('./router/router')

app.engine('handlebars',engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended:true}))


let connectDb=async()=>{
    await connect(MONGODB_URII)
    console.log("mongoDB connected");  
}
connectDb()

// app.get('/',(req,res)=>{
//     res.send("Hello Contact App")
// })
app.get('/',(req,res)=>{
    res.render('home',{title:'Home Page'})
})
app.use('/api',routing)


app.listen(PORTT,err=>{
    if(err) console.log(err)
    console.log("Server is running on port 5001");  
})

