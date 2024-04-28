const Stream = require('../models/Stream')


async function getApiKey (req,res){
    try{
        res.json(process.env.DAILY_API_KEY);
    }catch (e){
        res.json({error:e.message})
    }
}

async function createStream(req,res){
    try{
        const user = req.user;
        let stream = req.body;
        stream.owner = user.email;
        console.log(stream);
        await Stream.create(stream);
        res.status(200).json(stream);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

async function getPlayingStreams(req,res){
    try{
        const user = req.user;
        const streams = await Stream.find();
        let myLiveStream = streams.filter(stream=> stream.status === "PLAYING");
        res.status(200).json(myLiveStream);
    }catch (e){
        res.status(400).json({error:e.message});
    }

}

async function deleteAll(req, res) {
    try {
        const streams = await Stream.find();
        for (const stream of streams) {
            await Stream.findByIdAndDelete(stream._id);
        }
        res.status(200).send("All streams deleted successfully");
    } catch (error) {
        console.error("Error deleting streams:", error);
        res.status(500).send("Internal server error");
    }
}


module.exports = {getApiKey,createStream,getPlayingStreams,deleteAll}