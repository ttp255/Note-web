const express=require('express')
const router=express.Router()
const mainController=require('../controllers/mainControllers')

router.route('/')
    .get(mainController.homePage)
module.exports=router