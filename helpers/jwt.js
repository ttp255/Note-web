const jwt=require('jsonwebtoken')
module.exports={
    signToken:(data={},secret,expires)=>{
        const token= jwt.sign(data,secret,{expiresIn:expires})
        return token
    },
    verifyToken:(token,secret)=>{
        let decoded,error
       try{
            decoded= jwt.verify(token,secret)
       }catch(err){
            error=err
       }
       return [decoded,error]
    }
}
