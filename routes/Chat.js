const express=require("express")
const router=express.Router()
const ChatController=require('../Controller/ChatController')




router.post('/add',ChatController.add);

router.get('/getall',ChatController.getall);

router.get('/getbyid/:id',ChatController.getbyid);

router.get('/getbyname/:name',ChatController.getbyname);

router.put('/update/:id',ChatController.update);

router.delete('/delete/:id',ChatController.deletechat);

module.exports = router;



