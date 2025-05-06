const logoutController=require('../controllers/logoutController')
const exprees=require('express')
const router=exprees.Router()

router.route('/logout')
    .get(logoutController.logout)
module.exports=router