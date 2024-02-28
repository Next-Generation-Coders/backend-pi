const express = require("express");
const http = require("http");
const cors = require('cors');
const Bodyparser = require('body-parser');
const mongo = require("mongoose");
const app = express();
const server = http.createServer(app);
const allowedOrigin = 'http://localhost:5173';
const config = require('./config/dbconfig.json');
const db = require('./config/dbcon');
const Tournament = require('./models/Tournament');

// Middleware
app.use(Bodyparser.json());
app.use(cors());

// Routes
const userRouter = require("./routes/User");
app.use("/User", userRouter);

const TournamentRouter = require("./routes/Tournament");
app.use("/Tournament", TournamentRouter);

const TeamRouter = require("./routes/Team");
app.use("/Team", TeamRouter);

const MatchRouter = require("./routes/Match");
app.use("/Match", MatchRouter);

// Server setup
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Database connection
mongo.connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Database connected")).catch(() => console.log("Error with database connection"));

module.exports = app;
