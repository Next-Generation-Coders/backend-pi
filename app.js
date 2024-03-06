const express = require("express");
const http = require("http");
const cors = require('cors');
const Bodyparser = require('body-parser');
const mongo = require("mongoose");
const app = express();
const config = require('./config/dbconfig.json');
const cookieParser = require('cookie-parser')
const passport = require("passport");
const googleAuth = require("./routes/index");
const session = require("express-session");
const ResultRouter=require("./routes/ResultRoute");
const Result = require('./models/Result')
const config = require('./config/dbconfig.json');
const Tournament = require('./models/Tournament');
const cookieParser = require('cookie-parser') ;

// Middleware
app.use(Bodyparser.json());
app.use(cors());
app.use(cookieParser())

//session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

//morgan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth")(passport);

app.use("/", googleAuth);


app.use(Bodyparser.json())
require('dotenv').config() 
// Routes
const userRouter = require("./routes/User");
app.use("/User", userRouter);

const TournamentRouter = require("./routes/Tournament");
app.use("/Tournament", TournamentRouter);

const TeamRouter = require("./routes/Team");
app.use("/Team", TeamRouter);

app.use(cors());
const PaymentRouter = require("./routes/Payment");
app.use("/Payment", PaymentRouter);

// complaint Routes
const ComplaintRouter = require("./routes/Complaint");
app.use("/api", ComplaintRouter);
const MatchRouter = require("./routes/Match");
app.use("/Match", MatchRouter);

// Server setup
app.use("/api",ResultRouter);
const server=http.createServer(app);
const io=require("socket.io")(server);

// Database connection
server.listen(3000,console.log("server is running"))
  mongo.connect(config.url ,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
  }).then (()=> console.log("database connected")).catch(()=>console.log("error with db connection "));

io.on("connection", (socket) => {
    console.log('Client connected');

    socket.on('goal', async ({ team }) => {
        try {
            // Update match data in the database based on the team that scored
            const result = await Result.findOne().populate('match');
            if (!result) {
                Error('Match not found');
            }

            if (team === 'team1') {
                console.log("team1 goal")
                result.team1Goals++;
            } else if (team === 'team2') {
                console.log("team2 goal")

                result.team2Goals++;
            }

            await result.save();

            // Emit scoreUpdate event to all connected clients with updated score information
            io.emit('scoreUpdate', { team1Goals: result.team1Goals, team2Goals: result.team2Goals });
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



module.exports = app;
