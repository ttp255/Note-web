const mongoose=require('mongoose')
const {noteDB}=require('../config/init_db')

const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    // refreshToken:{
    //     type:String,
    //     default:null
    // }

    
    

})
module.exports=noteDB.model('user',UserSchema)