//je change le nom de l'entité ici et partout
const Tournament = require('../models/Tournament')
const Team = require('../models/Team');
const Match = require('../models/Match');

async function add (req,res){
    console.log(req.body)
    try{
    const tournament= new Tournament(req.body)
    await tournament.save();
    res.status(200);
    } catch (err){
        res.status(400).json({error:err})
    }
}

async function getall (req,res){
    try{
        const data = await Tournament.find()
        res.status(200).send(data)

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function getbyid (req,res){
    try{
        const data = await Tournament.findById(req.params.id)
        res.status(200).send(data)
    }catch(err){
        res.status(400).json({error:err});
    }

}

async function getbyname (req,res){
    try{
        let name=req.params.nameClass
        //toujours avec {} pour connaitre les parametres seulement l id le connait
        const data = await Tournament.findOne({name});
        res.status(200).send(data)
    }catch(err){
        res.status(400).json({error:err});
    }
}


async function update (req,res){
    try{
        await Tournament.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send('updated')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function deleteTournament (req,res){
    try{
        await Tournament.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function generateRoundRobinSchedule(req,res) {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('teams');
        if (!tournament) {
            throw new Error("Tournament not found");
        }

        const teams = tournament.teams;
        const numTeams = teams.length;
        const schedule = [];

        if (numTeams % 2 !== 0) {
            teams.push(new Team({ name: "Dummy Team" }));
        }

        const numRounds = numTeams - 1;
        const halfNumTeams = numTeams / 2;

        for (let round = 1; round <= numRounds; round++) {
            const roundSchedule = [];
            for (let i = 0; i < halfNumTeams; i++) {
                const match = new Match({
                    team1: teams[i],
                    team2: teams[numTeams - 1 - i],
                    round: round,
                    tournament:req.params.id
                });
                await match.save();
                roundSchedule.push(match);
            }
            schedule.push(roundSchedule);

            // Rotate teams in the array for the next round
            teams.splice(1, 0, teams.pop());

        tournament.matches = roundSchedule.flat();
        await tournament.save();
        }

        
        console.log(schedule)
    } catch (error) {
        throw error;
    }
}

async function addTeams(req, res) {
    try {
        const tournamentId = req.params.id;
        const teamsToAdd = req.body.teams;

        // Find the tournament by ID
        const tournament = await Tournament.findById(tournamentId);

        if (!tournament) {
            return res.status(404).json({ error: "Tournament not found" });
        }

        // Push the IDs of teams to add into the teams array field of the tournament document
        tournament.teams.push(...teamsToAdd);

        // Save the updated tournament document
        const updatedTournament = await tournament.save();

        res.status(200).json({ message: "Teams added to tournament successfully", tournament: updatedTournament });
    } catch (error) {
        console.error("Error adding teams:", error);
        res.status(500).json({ error: "Failed to add teams" });
    }
}

module.exports={add,getall,getbyid,getbyname,update,deleteTournament,generateRoundRobinSchedule,addTeams}