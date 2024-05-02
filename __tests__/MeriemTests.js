const express = require('express');
const ResultRouter = require('../routes/ResultRoute');

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
  app.use('/result', ResultRouter);


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