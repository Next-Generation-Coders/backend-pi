//je change le nom de l'entité ici et partout
const User = require('../models/User')

async function add(req, res) {
    try {
        console.log(req.body);
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}


async function getall (req,res){
    try{
        const data = await User.find()
        res.status(200).send(data)

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function getbyid (req,res){
    try{
        const data = await User.findById(req.params.id)
        res.status(200).send(data)
    }catch(err){
        res.status(400).json({error:err});
    }

}

async function getbyname (req,res){
    try{
        let name=req.params.nameClass
        //toujours avec {} pour connaitre les parametres seulement l id le connait
        const data = await User.findOne({name});
        res.status(200).send(data)
    }catch(err){
        res.status(400).json({error:err});


    }

}


async function update (req,res){
    try{
        await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send('updated')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function deleteUser (req,res){
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')

    }catch(err){
        res.status(400).json({error:err});


    }

}

module.exports={add,getall,getbyid,getbyname,update,deleteUser}