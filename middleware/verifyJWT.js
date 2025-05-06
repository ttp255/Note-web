const {signToken,verifyToken}=require('../helpers/jwt')
require('dotenv').config()
const {getKey,delKey,setKey}=require('../helpers/redis')
const verifyJWT=async(req,res,next)=>{
     let token=req.cookies.token
     let refreshToken=req.cookies.refreshToken
 
    
    if( !refreshToken || !await getKey(refreshToken)){
        res.clearCookie('refreshToken',{httpOnly:true})
        return res.redirect('/sign-in')
    }

    if(!token){
        let [decodedRefreshToken,errorRefreshToken]=verifyToken(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        
        if(errorRefreshToken){
            return res.redirect('sign-in')
        }
        id=decodedRefreshToken.id
        username=decodedRefreshToken.username

        token=await getKey(refreshToken)
        if(token){
            if(token==='used'){
                //Conflict
                setKey(id.toString(),1)
                res.clearCookie('refreshToken',{httpOnly:true})
                return res.redirect('sign-in')
                
            }

        }else{
            return res.redirect('sign-in')
        }
     
        
    }
    //verifytoken 
    const [decoded,error]=verifyToken(token,process.env.ACCESS_TOKEN_SECRET)
  
    if(error){
        if(error.message==='jwt expired'){
  
            // //signKey

            const newToken=signToken(
                {id:id,username:username},process.env.ACCESS_TOKEN_SECRET,15)

            const newRefreshToken=signToken(
                {id:id,username:username},process.env.REFRESH_TOKEN_SECRET,'30d')

            setKey(refreshToken,'used',24*60*60)
            setKey(newRefreshToken,newToken)


            res.cookie('token',newToken,{httpOnly:true,maxAge:15*1000})
                .cookie('refreshToken',newRefreshToken,
                    {httpOnly:true,maxAge:30*24*60*60*1000})
            req.id=id
            req.user=username
                
            return next()
    
        }else{
            return res.redirect('sign-in')
        }
            
    }
    //Conflict 
    if(await getKey(decoded.id.toString())){
        delKey(decoded.id.toString())
        require('../controllers/logoutController')
    }
   
    
    req.id=decoded.id
    req.user=decoded.username


    next()

}


module.exports=verifyJWT