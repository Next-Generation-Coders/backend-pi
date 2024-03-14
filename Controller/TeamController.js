//je change le nom de l'entité ici et partout
const Team = require('../models/Team');
const User = require('../models/User');
const Role = require('../models/User');
const Coach=require('../models/User');

const { getPlayersByIds } = require("../Controller/UserController")
async function add(req, res) {
    //console.log(req.body);
    try {
        const team = new Team();
        team.name = req.body.name;
        team.logo = "";
        team.players =  [];
        team.coach = req.params.id;
        team.team_manager = req.params.id;
        team.staff = [];
        team.matches = [];

        await team.save(); 

        const coach = await Coach.findById(req.params.id)
        coach.currentTeam = team._id;
        await coach.save();

        const teamManager = await Coach.findById(req.params.id)
        teamManager.currentTeam = team._id;
        await teamManager.save();
        
        res.status(200).send("Add");
    } catch (err) {
        res.status(400).json({ error: err });
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
        const data = await Team.findById(req.params.id).populate('players')
        res.status(200).send(data)


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
        await Team.findByIdAndUpdate(req.params.id,req.body)
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

async function addPlayerToTeam(req, res) {
    try {
        const coach = await Coach.findById(req.params.id);
//         if (coach && coach.roles === 'COACH') {
 //            // Check if the player already exists in the database
            const existingPlayer = await User.findOne({ email: req.body.email });
            if (existingPlayer) {
                // Check if the existing player is already part of a team
                const existingTeam = await Team.findOne({ players: existingPlayer._id });
                if (existingTeam) {
                    // Remove the player from the existing team
                    existingTeam.players.pull(existingPlayer._id);
                    await existingTeam.save();
                }
                existingPlayer.currentTeam=coach.currentTeam;
                existingPlayer.teams.push(coach.currentTeam)
                const team = await Team.findOne({ team_manager: coach._id });
                team.players.push(existingPlayer._id);
                await team.save();
            } else {
                // Create a new player if they don't exist
                const player = new User(req.body);
                console.log(player)
                player.roles=[10,11] 
                player.currentTeam=coach.currentTeam
                player.teams.push(coach.currentTeam)
                //console.log(player+"\n"+player.roles)
                await player.save();
                //existingPlayer = player;
                const team = await Team.findOne({ team_manager: coach._id });
                team.players.push(player._id);
                await team.save();
            }

            // Find the team associated with the coach
        //const team = await Team.findOne({ coach: coach._id });

        //console.log("coach._id : "+coach._id+"\nteam :\n"+team)

            // Add the new player's ID to the team's players array
        //team.players.push(player._id);
        
            // Save the updated team to the database
        //await team.save();

        return res.status(200).json({ message: 'Player added to the team successfully' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}



async function checkCoach(req, res) {
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
        const playerNames = await getPlayersByIds(team.players);
        const teamWithPlayerNames = { ...team.toObject(), playerNames };
        res.status(200).json(teamWithPlayerNames);
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
        const playerNames = await getPlayersByIds(team.players);
        //const coachName = await getPlayersByIds(team.coach);
        const teamWithPlayerNames = { ...team.toObject(), playerNames };
        res.status(200).json(teamWithPlayerNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addCoachToTeam(req, res) {
     try {
        const Tmanager = await Coach.findById(req.params.id);
            const existingCoach = await User.findOne({ email: req.body.email });
            existingCoach.currentTeam=Tmanager.currentTeam;
            existingCoach.teams.push(Tmanager.currentTeam)
                const team = await Team.findOne({ team_manager: Tmanager._id });
                team.coach=existingCoach._id;
                await team.save();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
}
}


module.exports={add,getall,getbyid,getbyname,update,deleteTeam,addPlayerToTeam,checkCoach,updateXTeam,getTeambyCoach,getTeambyTeamManger,addCoachToTeam}