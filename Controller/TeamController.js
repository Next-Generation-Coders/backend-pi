//je change le nom de l'entité ici et partout
const Team = require('../models/Team');
const User = require('../models/User');
const Role = require('../models/User');
const Coach=require('../models/User');
const Tournament=require('../models/Tournament');
const Match=require('../models/Match');
const mailer = require('../config/nodemailer');

const { getPlayersByIds } = require("../Controller/UserController")
async function add(req, res) {
    //console.log(req.body);
    try {
        const team = new Team();
        console.log("\n testtss ..........."+req.file.filename +"\n")
        team.name = req.body.name;
        team.logo = "https://lutback.azurewebsites.net/uploads/team/"+req.file.filename ;
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
        const playerNames = await getPlayersByIds(team.players);
        const coachName = await getPlayersByIds(team.coach);
        const teamManagerName = await getPlayersByIds(team.team_manager);
        const teamWithPlayerNames = { ...team.toObject(), playerNames ,coachName,teamManagerName };
        res.status(200).json(teamWithPlayerNames);
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

async function addPlayerToTeam(req, res) {
    try {
        const coach = await Coach.findById(req.params.id);
        const existingPlayer = await User.findOne({ email: req.body.email });
        if (existingPlayer) {

            existingPlayer.currentTeam=coach.currentTeam;
            existingPlayer.teams.push(coach.currentTeam)
            await existingPlayer.save();
            const team = await Team.findOne({ team_manager: coach._id });
            team.players.push(existingPlayer._id);
            await team.save();

            req.body.roles = [10, 11];
            const player = await User.findByIdAndUpdate(existingPlayer._id, req.body);
            player.roles=[10,11]  ;
            await player.save();
            return res.status(200).json({ message: 'Player updtated successfully' });
        } else {
            const player = await User.signupPlayer(
                req.body.email,
                req.body.password,
                req.body.phone,
                req.body.fullname,
                req.body.age,
                req.body.position,
                req.body.jersyNumber,
                req.body.country,
                req.body.preferedFoot,
                req.body.height
            );
            if(player){
                await mailer.sendMail({
                    from: 'ygharrad@gmail.com',
                    to: req.body.email,
                    subject: "LinkUpTournament",
                    text: `Welcome New Player,
            
            You have been added by ${coach.fullname} to the LinkUpTournament platform. Below are your account details:
            
            Email: ${req.body.email}
            Password: ${req.body.password}
            
            Please keep your password secure and do not share it with anyone. You can use this password to log in to your account and access the platform.
            
            If you have any questions or need assistance, feel free to contact us.
            
            Best regards,
            The LinkUpTournament Team`, // plain text body
                });
            }
            await player.save();
        }
        return res.status(200).json({ message: 'Player added to the team successfully' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
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
        const coachName = await getPlayersByIds(team.coach);
        const teamManagerName = await getPlayersByIds(team.team_manager);
        const teamWithPlayerNames = { ...team.toObject(), playerNames ,coachName, teamManagerName };
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
            await existingCoach.save();
                const team = await Team.findOne({ team_manager: Tmanager._id });
                team.coach=existingCoach._id;
                await team.save();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
}
}


async function getTeamRating(req, res) {
    try {
        const teamId = req.params.id;

        // Fetch team data from the database
        const team = await Team.findById(teamId);

        // Perform calculations to determine the team's rating
        let teamRating = 0;
        let sumteamRating = 0;

        // Example: Calculate average player rating
        if (team.players && team.players.length > 0) {
            // Fetch player objects based on their IDs
            const playerPromises = team.players.map(async playerId => {
                const playerResponse = await fetch(`https://lutback.azurewebsites.net/User/getbyid/${playerId}`);
                return playerResponse.json();
            });
        
            // Wait for all player fetch requests to resolve
            const players = await Promise.all(playerPromises);
        
            // Calculate total player rating and average player rating
            const totalPlayerRating = players.reduce((acc, player) => {
                // Check if player.value exists and is a valid number
                const playerValue = parseFloat(player.value);
                if (!isNaN(playerValue)) {
                    // Add the player's value to the accumulator
                    return acc + playerValue;
                } else {
                    // Treat it as 0 if player.value is missing or not a number
                    return acc + 0;
                }
            }, 0);
            
            const averagePlayerRating = totalPlayerRating / players.length;
            // You can adjust the weight of player ratings based on your preference
            teamRating += (averagePlayerRating * 0.2); // Assuming player ratings contribute 50% to the team's rating
            sumteamRating = sumOfDigits(teamRating)/team.players.length;
            sumteamRating = Math.min(sumteamRating, 5);
        }
        

        /* // Example: Add points based on the number of trophies
        if (team.trophies && team.trophies.length > 0) {
            // You can define the points awarded for each type of trophy
            const trophyPoints = {
                'League Title': 10,
                'Cup Win': 5,
                // Add more trophy types and points as needed
            };
            team.trophies.forEach(trophy => {
                teamRating += trophyPoints[trophy.type];
            });
        } */

        // You can include other factors such as team performance, market value of players, etc.

        // Return the team's rating
        console.log(sumteamRating+"....")
        if (sumteamRating != team.rating || isNaN(sumteamRating)) {
            team.rating = sumteamRating;
            await team.save();
        }else{
            sumteamRating=team.rating
        }
        
        res.status(200).json({ rating: sumteamRating });
    } catch (err) {
        res.status(400).json({ error: err.message });
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

async function removePlayerFromTeam(req, res) {
    try {
        const player = await User.findById(req.query.idPlayer);
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        // Find the team
        const team = await Team.findById(player.currentTeam);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Remove the player from the team's players array
        const playerIndex = team.players.indexOf(player.id);
        if (playerIndex !== -1) {
            team.players.splice(playerIndex, 1);
        }

        // Save the team
        await team.save();

        // Update the player's currentTeam field
        player.currentTeam = null; // or set it to another value as needed

        // Save the player
        await player.save();

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports={add,getall,getbyid,getbyname,update,deleteTeam,addPlayerToTeam,checkTeam_manager,updateXTeam,getTeambyCoach,getTeambyTeamManger,addCoachToTeam,getTeamRating,getTournaments,removePlayerFromTeam}