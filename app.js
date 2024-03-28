const express = require("express")
const http = require("http")
const cors = require('cors');
const Bodyparser=require('body-parser')
const mongo= require ("mongoose")
const allowedOrigin = 'http://localhost:5173';
const config=require ('./config/dbconfig.json')
mongo.connect(config.url ,{
  useUnifiedTopology:true,
  useNewUrlParser:true,
}).then (()=> console.log("database connected")).catch(()=>console.log("error with db connection "));

const db = require('./config/dbcon');
const Tournament = require('./models/Tournament');
const ResultRouter=require("./routes/ResultRoute");
const Result = require('./models/Result')
var app = express()
app.use(cors());

app.use(Bodyparser.json())

app.use("/api",ResultRouter);
const server=http.createServer(app);
const io=require("socket.io")(server);



io.on("connection", (socket) => {
  console.log('Client connected');

  socket.on('goal', async ({ team,matchID }) => {
    try {
      // Update match data in the database based on the team that scored
      console.log(matchID)
      const result = await Result.findOne( {match: matchID}).populate('match');

      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 goal")
        result.team1Goals++;
        //result.team1Goals.push({ time }); // Store the time of the goal

      } else if (team === 'team2') {
        console.log("team2 goal")

        result.team2Goals++;
        //result.team2Goals.push({ time }); // Store the time of the goal

      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('scoreUpdate', { team1Goals: result.team1Goals, team2Goals: result.team2Goals });
    } catch (error) {
      console.error('Error:', error.message);
    }
  } );

  socket.on('red', async ({ team,matchID }) => {
    try {
      // Update match data in the database based on the team that scored
      const result = await Result.findOne({match: matchID}).populate('match');
      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 red")
        result.team1Red++;
      } else if (team === 'team2') {
        console.log("team2 red")

        result.team2Red++;
      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('redUpdate', { team1Red: result.team1Red, team2Red: result.team2Red });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  );
  socket.on('yellow', async ({ team,matchID }) => {
    try {
      // Update match data in the database based on the team that scored
      const result = await Result.findOne({match: matchID}).populate('match');
      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 yellow")
        result.team1Yellow++;
      } else if (team === 'team2') {
        console.log("team2 yellow")

        result.team2Yellow++;
      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('yellowUpdate', { team1Yellow: result.team1Yellow, team2Yellow: result.team2Yellow });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  );
  socket.on('corners', async ({ team,matchID }) => {
    try {
      // Update match data in the database based on the team that scored
      const result = await Result.findOne({match: matchID}).populate('match');
      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 corner")
        result.team1Corners++;
      } else if (team === 'team2') {
        console.log("team2 corner")

        result.team2Corners++;
      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('cornersUpdate', { team1Corners: result.team1Corners, team2Corners: result.team2Corners });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  );
  socket.on('offsides', async ({ team,matchID }) => {
    try {
      // Update match data in the database based on the team that scored
      const result = await Result.findOne({match: matchID}).populate('match');
      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 offside")
        result.team1Offsides++;
      } else if (team === 'team2') {
        console.log("team2 offside")

        result.team2Offsides++;
      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('offsidesUpdate', { team1Offsides: result.team1Offsides, team2Offsides: result.team2Offsides });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  );
 

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000,console.log("server is running"))
 
module.exports =app