const express = require("express");
const http = require("http");
const cors = require('cors');
const Bodyparser = require('body-parser');
const mongo = require("mongoose");
const app = express();
const server = http.createServer(app);
const config = require('./config/dbconfig.json');
const Tournament = require('./models/Tournament');
const cookieParser = require('cookie-parser')
const passport = require("passport");
const googleAuth = require("./routes/index");
const session = require("express-session");



// Middleware
app.use(Bodyparser.json());
app.use(cors());
app.use(cookieParser())
require('dotenv').config()

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

// Routes
const userRouter = require("./routes/User");
app.use("/User", userRouter);

const TournamentRouter = require("./routes/Tournament");
app.use("/Tournament", TournamentRouter);

const TeamRouter = require("./routes/Team");
app.use("/Team", TeamRouter);

const PaymentRouter = require("./routes/Payment");
app.use("/Payment", PaymentRouter);

// complaint Routes
const ComplaintRouter = require("./routes/Complaint");
app.use("/api", ComplaintRouter);

// Server setup
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Database connection
mongo.connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Database connected")).catch(() => console.log("Error with database connection"));

module.exports = app;
