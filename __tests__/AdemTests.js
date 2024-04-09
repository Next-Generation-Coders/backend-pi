const express = require('express');
const TournamentRouter = require('../routes/Tournament');
const StandingsRouter = require ('../routes/StandingsRouter');
const StadiumRouter = require('../routes/Stadium');
const request = require('supertest');
const { expect } = require('chai');
const mongo = require("mongoose");
const config = require("../config/dbconfig.json");
const jwt = require("jsonwebtoken");
const fs = require('fs');




mongo.connect(config.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}).catch((err) => {
  console.error("Error with database connection:", err);
});



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Tournament', TournamentRouter);
app.use('/Standings', StandingsRouter);
app.use('/Stadium', StadiumRouter);
async function resolveGetTournaments() {
  
  return await request(app)
      .get('/Tournament/getall')
      
}

describe('GET /Tournament/getall', () => {
  it('get all tournaments', async () => {
    const response = await resolveGetTournaments();
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('GET /Tournament/getbyname/:name', () => {
  it('should get tournament by name', async () => {
    const response = await request(app)
      .get('/Tournament/getbyname/fhsdfh');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});

describe('GET /Tournament/fixtures/:id', () => {
  it('should get fixtures by tournament id for league tournament type', async () => {
    const response = await request(app)
      .get('/Tournament/fixtures/65fb933aaa2b8bc81f3289e8');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

/*describe('POST /Tournament/add', () => {
  it('should add a new tournament', async () => {
    
    const base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABXgA…LNEqXoAiiP4RH8K8FGABft9eguezbUgAAAABJRU5ErkJggg==";
 
    const accessToken = jwt.sign(
      {
        "user": {
          email: "moatazfoudhaily@gmail.com",
          roles: [30]
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
  );
    const tournamentObject = {
      title: "Tournament Object for Test",
      startDay: 1,
      startMonth: 1,
      startYear: 2024,
      endDay: 10,
      endMonth: 1,
      endYear: 2024,
      Country: "Example Country",
      City: "Example City",
      trophy: "Example Trophy",
      numberOfPlayers: 100,
      numberOfTeams: 10,
      TournamentType: "League",
      TournamentStatus: "Pending",
      access: "Private",
      FriOrComp: "Competitive",
      teams: ["team1_id", "team2_id", "team3_id"], 
      
      logo : base64Logo,
      followers: ["follower1_id", "follower2_id"], // Array of follower IDs
      rating: {
        '5 stars': 10,
        '4 stars': 5,
        '3 stars': 3,
        '2 stars': 2,
        '1 star': 1
      },
      winners: ["winner_id"],
      referees: ["referee1_id", "referee2_id"], // Array of referee IDs
      Staduims: ["stadium1_id", "stadium2_id"] // Array of stadium IDs
    };
    const response = await request(app)
    .post('/Tournament/add')
    .send(tournamentObject)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`);

  console.log(response.statusCode);
  expect(response.statusCode).to.equal(201); // Assuming you return 201 upon successful creation
}).timeout(30000);
});    */
describe('GET /Standings/GetByTournament/:id', () => {
  it('should get the standings by the tournament id ', async () => {
    const response = await request(app)
      .get('/Standings/GetByTournament/65fb933aaa2b8bc81f3289e8');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

describe('GET /Standings/GetbyID/:id', () => {
  it('should get the standings by their id ', async () => {
    const response = await request(app)
      .get('/Standings/GetbyID/65fb9346aa2b8bc81f3289f2');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

describe('GET /Stadium/getall', () => {
  it('should get all the stadiums in the databse', async () => {
    const response = await request(app)
      .get('/Stadium/getall');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});
async function GetTournamentsByUser() {
  const accessToken = jwt.sign(
      {
        "user": {
          email: "moatazfoudhaily@gmail.com",
          roles: [30]
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' }
  );
  return await request(app)
      .get('/Tournament/UserTournaments')
      .set('authorization', `Bearer ${accessToken}`);
}


describe('GET /Tournament/UserTournaments', () => {
  it('should return the user tournaments', async () => {
    const response = await GetTournamentsByUser();
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('PUT /Tournament/addRate/:id', () => {
  it('should add a rating to the tournament given its id ', async () => {
    const rate = {"rate" : 5};
    const response = await request(app)
      .put('/Tournament/addRate/65fb933aaa2b8bc81f3289e8')
      .send({"rate"  : 5})
      .set('Accept', 'application/json');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('PUT /Tournament/follow/:id', () => {
  it('should let the user follow the tournament given its id ', async () => {
    const accessToken = jwt.sign(
      {
        "user": {
          email: "moatazfoudhaily@gmail.com",
          roles: [30]
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' }
  );
    const response = await request(app)
      .put('/Tournament/follow/65fb933aaa2b8bc81f3289e8')
      .set('authorization', `Bearer ${accessToken}`);
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

describe('POST /Stadium/add', () => {
  it('should create a staduim ', async () => {
    const stadiumData = {
      name: "terrain el alia ",
      location: "el alia ",
      startResDay: 1,
      startResMonth: 4,
      startResYear: 2024,
      capacity: 2600
    };
    const response = await request(app)
      .post('/Stadium/add')
      .send(stadiumData)
      .set('Accept', 'application/json');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('GET /Tournament/getRefereesAndStadiumsForTournament/:id', () => {
  it('should refs and stadiums of the tournament given its id', async () => {
    const response = await request(app)
      .get('/Tournament/getRefereesAndStadiumsForTournament/65fb933aaa2b8bc81f3289e8');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});
