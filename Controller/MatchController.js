//je change le nom de l'entité ici et partout
const Match = require('../models/Match')
const Team = require('../models/Team')
const Tournament = require('../models/Tournament')
async function getRefereeMatches (req,res){
    try{
        const user = req.user;
        const data = await Match.find();
        const myMatches = data.filter(match=>(match._ref && match._ref.equals(user._id)));
        let matchesDTO = [];
        for (const match of myMatches) {
            const team1 = await Team.findById(match.team1);
            const team2 = await Team.findById(match.team2);
            const tournament = await Tournament.findById(match.tournament);
            const matchDTO = {
                _id:match._id,
                team1,
                team2,
                tournament,
                date : match.date
            }
            matchesDTO.push(matchDTO);
        }
        res.status(200).send(matchesDTO)
    }catch(err){
        res.status(400).json({error:err.message});
    }
}


async function add (req,res){
    console.log(req.body)
    try{
    const match= new Match(req.body)
    await match.save();
    res.status(200).send("Add");
    } catch (err){
        res.status(400).json({error:err})
    }
}

async function getall (req,res){
    try{
        const data = await Match.find().populate('team1' ).populate('team2' )
        res.status(200).send(data)

    }catch(err){
        res.status(400).json({error:err});
    }
}

async function getbyid (req,res){
    try{
        const data = await Match.findById(req.params.id)
        res.status(200).send(data)


    }catch(err){
        res.status(400).json({error:err});
    }

}

async function getbyname (req,res){
    try{
        let name=req.params.nameClass
        //toujours avec {} pour connaitre les parametres seulement l id le connait
        const data = await Match.findOne({name});
        res.status(200).send(data)


    }catch(err){
        res.status(400).json({error:err});
    }

}


async function update (req,res){
    try{
        await Match.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send('updated')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function deleteMatch (req,res){
    try{
        await Match.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')

    }catch(err){
        res.status(400).json({error:err});


    }

}


async function saveMatch (game){
    
    try{
    const match= new Match(game)
    await match.save();
    
    } catch (err){
        console.log(err);
    }
}

async function getTodaysMatches(req, res) {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day

        // Find matches for today
        const matches = await Match.find({
            date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } // Matches for today (from beginning to end of the day)
        });

        res.status(200).json(matches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function getClosestMatch(req, res) {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day

        // Find the closest match to today's date
        const closestMatch = await Match.find({
            date: { $gte: today }
        });

        res.status(200).json(closestMatch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports={add,getall,getbyid,getbyname,update,deleteMatch,getRefereeMatches,saveMatch,getTodaysMatches,getClosestMatch}
