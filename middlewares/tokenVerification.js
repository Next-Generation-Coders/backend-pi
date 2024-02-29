const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]
    console.log(token);
    try {
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = await User.findById(_id)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: error.message})
    }
}

const requireAdmin = async (req,res,next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
   }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const  {user}  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // const user = await User.findById(u._id);
        user.roles.forEach(role=>{
            if(role === "ADMIN"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}

const requireCoach = async (req,res,next) =>{
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
    }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(_id);
        user.roles.forEach(role=>{
            if(role === "COACH"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}

const requireOrganizer = async (req,res,next)=>{
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
    }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(_id);
        user.roles.forEach(role=>{
            if(role === "ORGANIZER"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}

const requirePlayer = async (req,res,next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
    }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const  u = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(u._id);
        user.roles.forEach(role=>{
            if(role === "PLAYER"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}

const requireCoachAndPlayer = async (req,res,next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
    }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(_id);
        user.roles.forEach(role=>{
            if(role === "COACH" || role === "PLAYER"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}

const requireReferee = async (req,res,next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({error: "Authorization is required!"})
    }

    const token = authorization.split(' ')[1]
    try{
        let authorized=false;
        const {user}  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const u = await User.findById(user._id);
        console.log(u);
        console.log(user);
        user.roles.forEach(role=>{
            if(role === "REFEREE"){
                authorized = true;
            }
        })
        if(!authorized){
            res.status(403).json({error:"Unauthorized"});
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(401).json({error : err.message});
    }
}



module.exports = {requireAuth,requireCoach,requirePlayer,requireOrganizer,requireCoachAndPlayer,requireReferee,requireAdmin}