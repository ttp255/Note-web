// const User=require('../model/User')
const {delKey}=require('../helpers/redis')
const {verifyToken}=require('../helpers/jwt')
require('dotenv').config()

const logout=async(req,res)=>{
    if(!req.cookies.refreshToken)return res.redirect('/')
    
    const refreshToken=req.cookies.refreshToken   

  

    // Delete accessToken and refreshToken in redis
    // while(await getKey(token)!=='OK'){
    //     newToken=await getKey(token)
    //     await delKey(token)
    //     token=newToken

    // }
    const [decoded,error]=verifyToken(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    // if(decoded)await delKey(decoded.id.toString())
    await delKey(refreshToken)
    //clear cookie
    res.clearCookie('token',{httpOnly:true})
        .clearCookie('refreshToken',{httpOnly:true})
    return res.redirect('/')
    
}
module.exports={logout}