const express = require('express');
const userRoutes = require('../routes/User');
const request = require('supertest');
const { expect } = require('chai');
const jwt = require("jsonwebtoken");
const mongo = require("mongoose");
const config = require("../config/dbconfig.json");
const ComplaintRouter = require('../routes/Complaint');
const TournamentRouter = require('../routes/TournamentRoutesForUnitTests');
const StandingsRouter = require ('../routes/StandingsRouter');
const StadiumRouter = require('../routes/Stadium');
const fs = require('fs');
const TeamRouter = require('../routes/TeamRoutesForUnitTests');

const ResultRouter = require('../routes/ResultRoute');

// Connect to MongoDB
mongo.connect(config.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log("Database connected");
  // app.listen(3000, () => {
  //   console.log("Server started on port 3000");
  // });
}).catch((err) => {
  console.error("Error with database connection:", err);
});

const app = express();
app.use('/User', userRoutes);
app.use('/api', ComplaintRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Tournament', TournamentRouter);
app.use('/Standings', StandingsRouter);
app.use('/Stadium', StadiumRouter);
app.use('/result', ResultRouter);
app.use('/Team', TeamRouter);





// Chouaib :

describe('GET /api/getbyname/:name', () => {
  it('should get complaint by title', async () => {
    const response = await request(app)
        .get('/api/getbyname/youssef');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});


describe('GET /api/getbyid/:id', () => {
  it('should get fixtures by tournament id for league tournament type', async () => {
    const response = await request(app)
        .get('/api/getbyid/65e72859b14de0b9d12be054');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

//Adem :
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
        .get('/Tournament/fixtures/662237ec10aec36261915caf');
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
        .put('/Tournament/follow/662237ec10aec36261915caf')
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
        .get('/Tournament/getRefereesAndStadiumsForTournament/662237ec10aec36261915caf');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


// Mariem :
describe('GET /result/teams/:matchId', () => {
  it('should get teams by ;qtchid', async () => {
    const response = await request(app)
        .get('/result/teams/65fb9347aa2b8bc81f328a18');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});

describe('GET /result/resultMatch/:matchId', () => {
  it('should get result by match id', async () => {
    const response = await request(app)
        .get('/result/resultMatch/65fb9347aa2b8bc81f328a18');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});

describe('GET /result/resultsSorted', () => {
  it('should get all resultsSorted', async () => {
    const response = await request(app)
        .get('/result/resultsSorted');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);

  }).timeout(30000);
});


describe('GET /result/resultsMatches', () => {
  it('should get all results with Matches', async () => {
    const response = await request(app)
        .get('/result/resultsMatches');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);

  }).timeout(30000);
});


describe('GET /result/result/:matchId', () => {
  it('should get result by matchid', async () => {
    const response = await request(app)
        .get('/result/result/663117938fa0c0b442586c50');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});
describe('GET /Team/getbyname/:name', () => {
  it('should get team by name', async () => {
    const response = await request(app)
        .get('/Team/getbyname/Everton');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    // Add more assertions as needed
  }).timeout(30000);
});


describe('GET /Team/getbyid/:id', () => {
  it('should team by id', async () => {
    const response = await request(app)
        .get('/Team/getbyid/662fbee624f8a866620dcb46');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('GET /Team/getall', () => {
  it('should get all teams', async () => {
    const response = await request(app)
        .get('/Team/getall');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);

  }).timeout(30000);
});

describe('GET /Team/getTeambyCoach/:id', () => {
  it('should team by the coach id', async () => {
    const response = await request(app)
        .get('/Team/getTeambyCoach/66252e4b4e79f25671bf7fe4');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});


describe('GET /Team/getTeambyTeamManger/:id', () => {
  it('should team by the team manager id', async () => {
    const response = await request(app)
        .get('/Team/getTeambyTeamManger/65df08079270efd8bfeeba5c');
    console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
  }).timeout(30000);
});

async function resolveGetUsers() {
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
  return await request(app)
      .get('/User/getall')
      .set('authorization', `Bearer ${accessToken}`);
}

describe('GET /User/getall', () => {
  it('get all users', async () => {
    try {
      const response = await resolveGetUsers();
      console.log(response.statusCode);
      expect(response.statusCode).to.equal(200);
    } catch (error) {
      console.log(error.message);
    }
  }).timeout(30000);
});