const express=require("express")
const router=express.Router()
const TeamController=require('../Controller/TeamController')




router.post('/add/:id',TeamController.add);

router.get('/getall',TeamController.getall);

router.get('/getbyid/:id',TeamController.getbyid);

router.get('/getbyname/:name',TeamController.getbyname);

router.put('/update/:id',TeamController.update);

router.delete('/delete/:id',TeamController.deleteTeam);

router.post('/addPlayer/:id',TeamController.addPlayerToTeam);

router.get('/checkCoach/:id',TeamController.checkCoach);

router.put('/updateXTeam/:id',TeamController.updateXTeam);

router.get('/getTeambyCoach/:id',TeamController.getTeambyCoach);

router.get('/getTeambyTeamManger/:id',TeamController.getTeambyTeamManger);

router.post('/addCoachToTeam/:id',TeamController.addCoachToTeam);

module.exports = router;