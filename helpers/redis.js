const {initRedis}=require('../config/init_redis')

const redisClient=initRedis()
module.exports={
    setKey:async(key,value,expires=0)=>{
        
        try{
            await redisClient.set(key,value)
            if(expires>0){
                redisClient.expire(key,expires)
            }
        }catch(err){
            console.log(`Set key error: ${err}`);
        }
       
    },
    getKey:(key)=>{
        try{
          return redisClient.get(key)
           
        }catch(err){
            console.log(err);
        }
        
    },
    delKey:(key)=>{
      
        try{
            return  redisClient.del(key)
        }catch(error){
            console.log(error);
        }
    },
 
}

