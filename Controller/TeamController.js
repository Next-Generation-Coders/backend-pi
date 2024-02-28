//je change le nom de l'entité ici et partout
const Team = require('../models/Team');
const User = require('../models/User');
const Coach=require('../models/User')

async function add (req,res){
    console.log(req.body)
    try{
    const team= new Team(req.body)
    await team.save();
    res.status(200).send("Add");
    } catch (err){
        res.status(400).json({error:err})
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
        // Find the coach by ID
        const coach = await Coach.findById(req.params.id);
        
        // Check if the coach exists and has the role of COACH
        if (coach && coach.role == "COACH") {
            // Check if the player already exists in the database
            const existingPlayer = await User.findOne({ email: req.body.email });
            if (existingPlayer) {
                // Check if the existing player is already part of a team
                const existingTeam = await Team.findOne({ players: existingPlayer._id });
                if (existingTeam) {
                    // Remove the player from the existing team
                    existingTeam.players.pull(existingPlayer._id);
                    await existingTeam.save();
                }
            } else {
                // Create a new player if they don't exist
                const player = new User(req.body);
                await player.save();
                existingPlayer = player;
            }

            // Find the team associated with the coach
            const team = await Team.findOne({ coach: coach._id });

            // Add the new player's ID to the team's players array
            team.players.push(existingPlayer._id);

            // Save the updated team to the database
            await team.save();

            return res.status(200).json({ message: 'Player added to the team successfully' });
        } else {
            return res.status(404).json({ error: 'Coach not found or not authorized' });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}




module.exports={add,getall,getbyid,getbyname,update,deleteTeam,addPlayerToTeam}