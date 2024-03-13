const express = require('express');
const router = express.Router();
const Lineup = require('../models/Lineup'); // Assuming you have a Lineup model

// POST request to save lineup data
async function add(req, res)  {

    try{
        const lineup= new Lineup(req.body)
        const savedLineup = await lineup.save();
        /* console.log(savedLineup) */
        res.status(201).json({ success: true, lineup: savedLineup });
        } catch (err){
            console.log(err)
        }
    
}

module.exports ={add};
