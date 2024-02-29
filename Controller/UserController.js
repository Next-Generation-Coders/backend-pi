const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const mailer = require('../config/nodemailer');
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

//                  ================= Auth ==================

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        user.password = '';

        const accessToken = jwt.sign(
            {
                "user": user._id._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { "user": user._id._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        if(!user.verified){
            await mailer.sendMail({
                from: 'moatazfoudhailii@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Confirm account", // Subject line
                text: "Please confirm", // plain text body
                html: "<b>Hello, confirm please</b>", // html body
            });
        }
        // Send accessToken containing username and roles
        res.json({ accessToken })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
    const {email,password,age,phone,fullname} = req.body

    try {

        const user = await User.signup(email,password,phone,fullname,age)

        user.password = '';

        const accessToken = jwt.sign(
            {
                "user": user._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        // Create a refresh token
        const refreshToken = jwt.sign(
            { "user": user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create cookie with refresh token
        res.cookie('jwt', refreshToken, {
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send email verification
        await mailer.sendMail({
            from: 'moatazfoudhailii@gmail.com',
            to: email,
            subject: "Confirm account",
            html: "<b>Hello, confirm please</b>",
        });

        res.status(200).json({accessToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "user": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}
//get the user's roles
const checkRoles = async (req,res)=>{

    const cookies = req.cookies
    console.log(req.cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    jwt.verify(
        cookies?.jwt,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            res.status(200).json({roles:decoded.user.roles})
        }
    )
}

//verify email
const verifyEmail = async (req,res)=>{
    const email = req.body.email
    const u = await User.findOne({email});
    if(!u){
        res.status(400).json({error:"Invalid email"})
    }
    try{
        u.verified = true;
        await User.findByIdAndUpdate(u._id,u);
        res.status(200).json({
            message : 'Email verified succeessfully'
        })
    }catch(err){
        res.status(400).json({
            error : err.message
        })
    }

}


const resetPassword = async (req,res)=>{
    let Email = req.body.email
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+';
    let password = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    const user = await User.findOne({email:Email.toString()});
    if(!user._id){
        Error('Invalid email');
    }
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(user._id,user);
        await mailer.sendMail({
            from: 'moatazfoudhailii@gmail.com',
            to: Email,
            subject: "Reset password request",
            html: "<p>Your password has been reset to: </p><b>"+password+"</b>",
        });
        res.status(200).json({user:user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//                  ===================== CRUD ======================

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

module.exports={add,getall,getbyid,getbyname,update,deleteUser,loginUser,signupUser,verifyEmail,resetPassword,refresh,checkRoles}