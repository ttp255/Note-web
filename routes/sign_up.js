const express=require('express')
const router=express.Router()
const registerController=require('../controllers/registerController')
router.route('/sign-up') 
    .get(registerController.signUpPage)
    .post(registerController.handlUser)

module.exports=router



