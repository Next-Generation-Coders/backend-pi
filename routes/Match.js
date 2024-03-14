const express=require("express")
const router=express.Router()
const MatchController=require('../Controller/MatchController')




router.post('/add',MatchController.add);

router.get('/getall',MatchController.getall);

router.get('/getbyid/:id',MatchController.getbyid);

router.get('/getbyname/:name',MatchController.getbyname);

router.put('/update/:id',MatchController.update);

router.delete('/delete/:id',MatchController.deleteMatch);

module.exports = router;



