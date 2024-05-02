const express = require('express');
const TeamRouter = require('../routes/TeamRoutesForUnitTests');

const request = require('supertest');
const { expect } = require('chai');
const mongo = require("mongoose");
const config = require("../config/dbconfig.json");
const jwt = require("jsonwebtoken");





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
  app.use('/Team', TeamRouter);


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