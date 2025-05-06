const bcrypt=require('bcrypt')
const {signToken}=require('../helpers/jwt')
const User=require('../model/User')
const {setKey,getKey}=require('../helpers/redis')
require('dotenv').config()

const handleLogin=async(req,res)=>{
    if (req.method=='POST'){
        const {username,password}=req.body
        const foundUser=await User.findOne({username})
        if(!foundUser){
            await setKey(req.socket.remoteAddress+'error','User is not existed!',10)
            return res.redirect('/sign-in')
         
        }
        
        const match=await bcrypt.compare(password,foundUser.password)

        
         if(match){
            const token= signToken({
                username:foundUser.username,
                id:foundUser._id
            },process.env.ACCESS_TOKEN_SECRET,15)
            const refreshToken= signToken({
                username:foundUser.username,
                id:foundUser._id
             },process.env.REFRESH_TOKEN_SECRET,'30d')
          
            // setKey refreshToken in redis
            setKey(refreshToken,token)

 
            //set list token of id should or shouldn't
            res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000})
              .cookie('token',token,
                {httpOnly:true,maxAge:15*1000})
            //set message    

            return res.redirect('/dashboard')
            
            
        }else{

            setKey(req.socket.remoteAddress+'error','Password is wrong!',10)
            return res.redirect('/sign-in')
           
            
        }
        
            
    }
    
    
}
const loginPage=async(req,res)=>{
    if(req.cookies.refreshToken){
        return res.redirect('dashboard')
    }
 
    res.render('login',{
        error:  await getKey(req.socket.remoteAddress+'error'),
        success:await getKey(req.socket.remoteAddress+'success')
     
    })

}

module.exports={handleLogin,loginPage}