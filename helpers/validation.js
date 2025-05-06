const Joi=require('joi')
const userValidate= (data={username,password,repassword,email})=>{
    const userSchema =Joi.object({
        username:Joi.string().min(3).max(24).lowercase(),
        password:Joi.string().min(4).max(32),
        repassword:Joi.string().min(4).max(32),
        email:Joi.string().pattern(new RegExp('gmail.com')).email().lowercase()
    })
    return userSchema.validate(data)
} 
module.exports={userValidate}