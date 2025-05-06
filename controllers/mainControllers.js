const homePage=(req,res)=>{
    const locals={
        title:"Note app",
        description:"Nodejs Notes app."
    }
    res.render('index',locals)
}

module.exports={homePage}