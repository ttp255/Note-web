const redis=require('redis')
require('dotenv').config()
let client=redis.createClient({

    url:process.env.URL_REDIS
}
)

const statusRedis={
    connect:'connect',
    end:'end',
    error:'error',
    reconnecting:'reconnecting'
}
const handleEventRedis=async({connectRedis})=>{
    connectRedis.on(statusRedis.connect,()=>{
        console.log(`${statusRedis.connect} redis success!`);
    })
    connectRedis.on(statusRedis.end,()=>{
        console.log(` ${statusRedis.end} redis success!`);
    })  
    connectRedis.on(statusRedis.reconnecting,()=>{
        console.log(`${statusRedis.reconnecting} redis success!`);
    })  
    connectRedis.on(statusRedis.error,(err)=>{
        console.log(`Redis error: ${err} !`);
    })
    
    await connectRedis.connect()
    
    
}
const initRedis=()=>{
    handleEventRedis({connectRedis:client})
    return client

}

module.exports={
    initRedis
}
