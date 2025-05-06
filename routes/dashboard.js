const express=require('express')
const router=express.Router()

const dashBoardController=require('../controllers/dashboardController')


router.get('/dashboard',dashBoardController.dashboard)

router.route('/dashboard/add')
    .get(dashBoardController.addNotePage)
    .post(dashBoardController.addNotes)


router.route('/dashboard/search')

    .post(dashBoardController.searchNote)

router.route('/dashboard/item/:id')
    .get(dashBoardController.viewNote)
    .post(dashBoardController.updateNote)


router.route('/dashboard/item-delete/:id')
        .post(dashBoardController.deleteNote)
        .get(dashBoardController.deleteNote)


module.exports=router