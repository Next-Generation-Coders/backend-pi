const express = require('express');
const router = express.Router();
const Lineup = require('../models/Lineup'); // Assuming you have a Lineup model
const Match = require('../models/Match'); // Assuming you have a Lineup model

// POST request to save lineup data
async function add(req, res) {
    try {
        const lineup = new Lineup(req.body);
        lineup.team = req.body.team;
        lineup.players = req.body.players;
        
        const lineupExists = await getbyid(req.body.matche,req.body.team);
        if (req.body.matche && lineupExists === "exist") {
            // If the lineup exists for the specified match ID, don't add a new one
            res.status(400).json({ error: "Lineup already exists for the specified match." });
            //console.log("exist")
        } else {
            // Otherwise, save the new lineup
            const savedLineup = await lineup.save();
            res.status(201).json({ success: true, lineup: savedLineup });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getbyid(id,team) {
    try {
        console.log("id " ,id)
        const lineup = await Lineup.find({matche :id , team:team});
        console.log("lineup  " ,lineup)
        if (lineup.length === 0) {
            console.log(" doesn't   exist")
            return "doesn't exist";
        } else {
            console.log("exist")
            return "exist";
        }
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error to be handled by the caller
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

async function getTeamsByMatch(req, res) {
    const matchId = req.params.matchId;

    try {
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ success: false, error: 'Match not found' });
        }

        const team1Id = match.team1;
        const team2Id = match.team2;

        team1Lineup = await Lineup.findOne({ team: team1Id, matche: matchId });
        team2Lineup = await Lineup.findOne({ team: team2Id, matche: matchId });

        // If lineups with the specific match ID don't exist, query lineups without the match ID
        if (!team1Lineup && !team2Lineup) {
            team1Lineup = await Lineup.findOne({ team: team1Id });
            team2Lineup = await Lineup.findOne({ team: team2Id });
        }

            /* team1Lineup = await Lineup.findOne({ team: team1Id });
            team2Lineup = await Lineup.findOne({ team: team2Id }); */

        res.status(200).json({  team1Lineup, team2Lineup });
    } catch (error) {
        console.error('Error fetching teams by match:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch teams by match' });
    }
}

module.exports ={add,getLineup,updateLineup,getTeamsByMatch};
