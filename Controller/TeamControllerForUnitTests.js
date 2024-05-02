const Team = require('../models/Team');
const User = require('../models/User');
const Role = require('../models/User');
const Coach=require('../models/User');
const Tournament=require('../models/Tournament');
const Match=require('../models/Match');

async function add(req, res) {
    //console.log(req.body);
    try {
        const team = new Team();
        console.log("\n testtss ..........."+req.file.filename +"\n")
        team.name = req.body.name;
        team.logo = "http://localhost:3000/uploads/team/"+req.file.filename ;
        team.players =  [];
        //team.coach = req.params.id;
        team.team_manager = req.params.id;
        team.staff = [];
        team.matches = [];

        await team.save(); 

        /* const coach = await Coach.findById(req.params.id)
        coach.currentTeam = team._id;
        await coach.save(); */

        const teamManager = await Coach.findById(req.params.id)
        teamManager.currentTeam = team._id;
        teamManager.teams.push(team._id);
        await teamManager.save();
        
        res.status(200).send("Add");
    } catch (err) {
        res.status(400).json({ error: err });
        console.log(err)
    }
}

async function getall (req,res){
    try{
        const data = await Team.find()
        res.status(200).send(data)

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function getbyid (req,res){
    try{
        const team = await Team.findById(req.params.id)
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json(team);
    }catch(err){
        res.status(400).json({error:err});
    }

}

async function getbyname (req,res){
    try{
        let name=req.params.nameClass
        //toujours avec {} pour connaitre les parametres seulement l id le connait
        const data = await Team.findOne({name});
        res.status(200).send(data)


    }catch(err){
        res.status(400).json({error:err});


    }

}


async function update (req,res){
    try{
        const team = await Team.findByIdAndUpdate(req.params.id,req.body)
        team.logo = req.file.filename;
        await team.save(); 
        res.status(200).send('updated')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function deleteTeam (req,res){
    try{
        await Team.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')

    }catch(err){
        res.status(400).json({error:err});


    }

}




async function checkTeam_manager(req, res) {
    try {
        const team = await Team.findOne({ team_manager: req.params.id });
        if (team) {
            //the coach is part of a team
            res.status(200).json({ exists: true });
        } else {
            //the coach dosen't currently have a team 
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

async function updateXTeam (req,res){
    try{
        const team = await Team.findOne({ coach: req.params.id });
        team.coach= null;
        
        await team.save() ;
        res.status(200).send('coach is resigned from this team!')
    }catch(err){
        res.status(400).json({error:err});
    }
}


async function getTeambyCoach (req,res){
    try {
        const team = await Team.findOne({ coach: req.params.id });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getTeambyTeamManger (req,res){
    try {
        const team = await Team.findOne({ team_manager: req.params.id });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        res.status(200).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}






function sumOfDigits(number) {
    // Convert number to string
    const numberString = number.toString();

    // Split the string into an array of characters, convert each character to a number, and sum them up
    const sum = numberString.split('').map(Number).reduce((acc, digit) => acc + digit, 0);

    return sum;
}

async function getTournaments(req, res) {
    try {
        const teamId = req.query.teamId;
        const matches = await Match.find({
            $or: [{ team1: teamId }, { team2: teamId }]
        })
        .populate('team1')
        .populate('team2')
        .populate('tournament');        
        res.status(200).json(matches);
           
       } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal server error' });
}
}




module.exports={add,getall,getbyid,getbyname,update,deleteTeam,checkTeam_manager,updateXTeam,getTeambyCoach,getTeambyTeamManger,getTournaments}