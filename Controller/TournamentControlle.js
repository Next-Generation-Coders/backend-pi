//je change le nom de l'entité ici et partout
const Tournament = require('../models/Tournament')

async function add (req,res){
    console.log(req.body)
    try{
    const tournament= new Tournament(req.body)
    await tournament.save();
    res.status(200).send("Add");
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

module.exports={add,getall,getbyid,getbyname,update,deleteTournament}