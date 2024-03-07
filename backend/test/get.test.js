import supertest from "supertest";
import { app } from "../index.js";

describe("GET /", function () {
  it("GET Hotel => code 200", function (done) {
    supertest(app)
      .get("/hotel/read")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("GET HotelbyId => code 200", function (done) {
    supertest(app)
      .get("/hotel/this/65e4cbd12d34b38342b18af9")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("GET User => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    supertest(app)
      .get("/user/read")
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("GET UserById => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    supertest(app)
      .get("/user/readById/65da5b3b84885d8ef2cc1754")
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("GET MyTickets => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    supertest(app)
      .get("/ticket/myTickets")
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});