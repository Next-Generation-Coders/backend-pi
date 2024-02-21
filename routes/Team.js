const express=require("express")
const router=express.Router()
const TeamController=require('../Controller/TeamController')




router.post('/add',TeamController.add);

router.get('/getall',TeamController.getall);

router.get('/getbyid/:id',TeamController.getbyid);

router.get('/getbyname/:name',TeamController.getbyname);

router.put('/update/:id',TeamController.update);

router.delete('/delete/:id',TeamController.deleteTeam);

module.exports = router;



