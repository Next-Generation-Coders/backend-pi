//je change le nom de l'entité ici et partout
const Chat = require('../models/Chat')


async function test (io){
    // console.log(req.body)
    try{
        io.emit('sent','Hello again!')
        console.log('emitted sent!')
    } catch (err){
        console.log('error:',err.message)
    }
}


// ====================================================================================
//  ===================================== CRUD =======================================
// ====================================================================================

async function add (req,res){
    console.log(req.body)
    try{
    const chat= new Chat(req.body)
    await chat.save();
    res.status(200).send("Add");
    } catch (err){
        res.status(400).json({error:err})
    }
}

async function getall (req,res){
    try{
        const data = await Chat.find()
        res.status(200).send(data)

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function getbyid (req,res){
    try{
        const data = await Chat.findById(req.params.id)
        res.status(200).send(data)


    }catch(err){
        res.status(400).json({error:err});


    }

}

async function getbyname (req,res){
    try{
        let name=req.params.nameClass
        //toujours avec {} pour connaitre les parametres seulement l id le connait
        const data = await Chat.findOne({name});
        res.status(200).send(data)


    }catch(err){
        res.status(400).json({error:err});


    }

}


async function update (req,res){
    try{
        await Chat.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send('updated')

    }catch(err){
        res.status(400).json({error:err});


    }

}

async function deletechat (req,res){
    try{
        await Chat.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')

    }catch(err){
        res.status(400).json({error:err});


    }

}

module.exports={add,getall,getbyid,getbyname,update,deletechat,test}