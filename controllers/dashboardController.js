const Notes=require('../model/Notes')


const dashboard=async(req,res)=>{

    const locals={
        title:"Dashboard",
        description:"Nodejs Notes app.",
      
        
    }
    try{
     
        const notes=await Notes.find({user:req.id}).sort({updatedAt:-1,createdAt:-1})
         res.render('dashboard/index',{
            userName:req.user,
            locals,
            notes,
            layout:'../views/layouts/dashboard',

        })
    }catch(err){
        console.log(err)
    }
    
  
}

const addNotes=async(req,res)=>{
    if(req.method=='POST'){
        const {title,body}=req.body
        if(!title||!body)res.sendStatus(400)
        await Notes.create({
            user:req.id,
            title,
            body


        })
        return res.redirect('/dashboard')


    }

}
const addNotePage=(req,res)=>{
    res.render('dashboard/add',{username:req.user, layout: "../views/layouts/dashboard"})

}
const viewNote=async(req,res)=>{
    let note=await Notes.findOne({_id:req.params.id})
    res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });


}
const searchNote=async(req,res)=>{
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const searchResults = await Notes.find({
            user: req.id,
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          ],
        })
    
        res.render("dashboard/search", {
          searchResults,
          layout: "../views/layouts/dashboard",
        });
      } catch (error) {
        console.log(error);
      }
}
const deleteNote=async(req,res)=>{
    try{
        // console.log(req.params.id)
        await Notes.findOneAndDelete({_id:req.params.id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
    }
}
const updateNote=async(req,res)=>{

    try{
        await Notes.findOneAndUpdate({_id:req.params.id},{
          title:req.body.title,
          body:req.body.body
        })
        res.redirect('/dashboard')
        
    }catch(err){

    }
}
module.exports={dashboard,addNotePage,addNotes,searchNote,updateNote,deleteNote,viewNote}