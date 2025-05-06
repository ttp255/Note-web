const User=require('../model/User')
const {userValidate}=require('../helpers/validation')
const bcrypt=require('bcrypt')
const {setKey,getKey}=require('../helpers/redis')
const handlUser=async(req,res)=>{
    if(req.method=='POST'){
        const user=req.body
        console.log(user);
        const {value,error}=userValidate(
            {username:user.username,password:user.password1,
                repassword:user.password2,email:user.email})
        if(error){
            setKey(req.socket.remoteAddress+"error",error.details[0].message.replaceAll('"',""),10)
            return res.redirect('/sign-up')

        }

        if(await User.findOne({username:user.username})){
            setKey(req.socket.remoteAddress+"error",'User is existed!',10)
            return res.redirect('/sign-up')
           
           
        }
        if(user.password1!==user.password2){
            setKey(req.socket.remoteAddress+"error",'Password is not match!',10)
            return res.redirect('/sign-up')
            
        }   
       
        await User.create({
            username:user.username,
            password:await bcrypt.hash(user.password1,await bcrypt.genSalt(10)),
            email:user.email,

        })
        setKey(req.socket.remoteAddress+'success','Please Sign in your account!',10)
        return res.redirect('/sign-in')


    }
    
    
}

const signUpPage=async(req,res)=>{
    res.render('sign_up',{
        error: await getKey(req.socket.remoteAddress+"error"),
    })
}
module.exports={signUpPage,handlUser}