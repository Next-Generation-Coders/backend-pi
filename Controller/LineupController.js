const express = require('express');
const router = express.Router();
const Lineup = require('../models/Lineup'); // Assuming you have a Lineup model

// POST request to save lineup data
async function add(req, res)  {

    try{
        const lineup= new Lineup(req.body)
        lineup.team=req.body.team ;
        const savedLineup = await lineup.save();
        /* console.log(savedLineup) */
        res.status(201).json({ success: true, lineup: savedLineup });
        } catch (err){
            console.log(err)
        }
    
}


// Fetch lineup by team ID
async function getLineup(req, res) {
    const teamId = req.params.teamId;

    try {
        // Assuming Lineup is the model for lineup data
        const lineup = await Lineup.findOne({ team: teamId });
        if(lineup){
            res.status(200).json({ success: true, lineup });
        }else{
            res.status(400).json({ success: false, lineup });
        }
        
    } catch (error) {
        console.error('Error fetching lineup:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch lineup' });
    }
}

// Update lineup by team ID
async function updateLineup(req, res) {
    const teamId = req.params.teamId;
    const lineupData = req.body;

    try {
        // Assuming Lineup is the model for lineup data
        const updatedLineup = await Lineup.findOneAndUpdate({ team: teamId }, lineupData, { new: true });
        res.status(200).json({ success: true, lineup: updatedLineup });
    } catch (error) {
        console.error('Error updating lineup:', error);
        res.status(500).json({ success: false, error: 'Failed to update lineup' });
    }
}

module.exports ={add,getLineup,updateLineup};
