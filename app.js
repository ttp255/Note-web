require('dotenv').config()
const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const cookieParser=require('cookie-parser')


const app=express()
const port=5000 ||process.env.PORT

//middleware

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())





//template engine

app.set('view engine','ejs')
//routes

app.use(express.static('public'))
app.use('/',require('./routes/login'))
app.use('/',require('./routes/sign_up'))

app.use(expressLayouts)//
app.set('layout','./layouts/main')//set layout
app.use('/',require('./routes/index'))
app.use('/',require('./routes/logout'))


app.use(require('./middleware/verifyJWT'))

app.use('/',require('./routes/dashboard'))
app.use(require('./routes/notfound'))


//run app
app.listen(port, ()=>{
    try{
        console.log(`App run on port ${port}`)
 
    }catch(err){
        console.log(err);
    }
   

    

})
