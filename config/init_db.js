const mongoose=require('mongoose')
require('dotenv').config()
const statusMongodb={
    connect:'connected',
    disconnect:'disconnected',
    error:'error'
}
function initDb (uri){
    const conn= mongoose.createConnection(uri,{
        
    })
    conn.on(statusMongodb.connect,()=>{
        console.log(`Mongodb connects success: !`);
    })
    conn.on(statusMongodb.disconnect,()=>{
        console.log(`Mongodb disconnects: !`);
    })
    conn.on(statusMongodb.error,(err)=>{
        console.log(`Mongodb error: ${JSON.stringify(err)}`);
    })
    process.on('SIGINT',async ()=>{
        await conn.close()
        process.exit(0)
    })
    return conn
}
const noteDB=initDb(process.env.MONGO_URI)

module.exports={noteDB}
