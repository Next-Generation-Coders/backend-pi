const express=require("express")
const router=express.Router()
const NotificationController=require('../Controller/NotificationController')




router.post('/add',NotificationController.add);

router.get('/getall',NotificationController.getall);

router.get('/getbyid/:id',NotificationController.getbyid);

router.get('/getbyname/:name',NotificationController.getbyname);

router.put('/update/:id',NotificationController.update);

router.delete('/delete/:id',NotificationController.deleteNotification);

module.exports = router;



