const express=require("express")
const router=express.Router()
const UserController=require('../Controller/UserController')




router.post('/add',UserController.add);

router.get('/getall',UserController.getall);

router.get('/getbyid/:id',UserController.getbyid);

router.get('/getbyname/:name',UserController.getbyname);

router.put('/update/:id',UserController.update);

router.delete('/delete/:id',UserController.deleteUser);

module.exports = router;



