const express=require("express")
const router=express.Router()
const StreamController=require('../Controller/StreamController')
const tokenVerification = require("../middlewares/tokenVerification");


router.get('/',StreamController.getApiKey)

router.post('/',tokenVerification.requireAuth,StreamController.createStream)

router.get('/playing',tokenVerification.requireAuth,StreamController.getPlayingStreams);

router.delete('/deleteAll',StreamController.deleteAll);

module.exports = router;



