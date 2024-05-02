// const express = require('express');
// const ComplaintRouter = require('../routes/Complaint');
//
// const request = require('supertest');
// const { expect } = require('chai');
// const mongo = require("mongoose");
// const config = require("../config/dbconfig.json");
// const jwt = require("jsonwebtoken");
//
//
//
//
//
// mongo.connect(config.url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }).then(() => {
//     console.log("Database connected");
//     app.listen(3000, () => {
//         console.log("Server started on port 3000");
//     });
// }).catch((err) => {
//     console.error("Error with database connection:", err);
// });
//
//
//
// const app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', ComplaintRouter);
//
// describe('GET /api/AllComplaints', () => {
//     it('should get all complaints', async () => {
//         const response = await request(app)
//             .get('/api/AllComplaints');
//         console.log(response.statusCode);
//         expect(response.statusCode).to.equal(200);
//
//     }).timeout(30000);
// });
// /*
//
//   describe('POST /api/createComplaint', () => {
//     it('should create a new complaint', async () => {
//         const userId = '65e649749c9002d76ab8c203';
//         const complaintData = {
//             userId: '65e649749c9002d76ab8c203',
//             title: 'Test Complaint Title',
//             description: 'Test Complaint Description',
//         };
//
//         const response = await request(app)
//             .post('/api/createComplaint')
//             .send(complaintData)
//             .set('Accept', 'application/json');
//
//         expect(response.statusCode).to.equal(201);
//     }).timeout(30000);
// });
//  */
//
// describe('GET /api/getbyname/:name', () => {
//     it('should get complaint by title', async () => {
//         const response = await request(app)
//             .get('/api/getbyname/youssef');
//         console.log(response.statusCode);
//         expect(response.statusCode).to.equal(200);
//         // Add more assertions as needed
//     }).timeout(30000);
// });
//
//
// describe('GET /api/getbyid/:id', () => {
//     it('should get fixtures by tournament id for league tournament type', async () => {
//         const response = await request(app)
//             .get('/api/getbyid/65e72859b14de0b9d12be054');
//         console.log(response.statusCode);
//         expect(response.statusCode).to.equal(200);
//     }).timeout(30000);
// });