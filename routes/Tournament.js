const express=require("express")
const router=express.Router()
const TournamentControlle=require('../Controller/TournamentControlle')




router.post('/add',TournamentControlle.add);

router.get('/getall',TournamentControlle.getall);

router.get('/getbyid/:id',TournamentControlle.getbyid);

router.get('/getbyname/:name',TournamentControlle.getbyname);

router.put('/update/:id',TournamentControlle.update);

router.delete('/delete/:id',TournamentControlle.deleteTournament);

router.get('/getByUserId/:userId', TournamentControlle.getTournamentsByUserId);

module.exports = router;



