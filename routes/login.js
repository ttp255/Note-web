const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')

router.route('/sign-in')
    .get(authController.loginPage)
    .post(authController.handleLogin)

module.exports=router 