import { expect } from 'chai';
import sinon from 'sinon';
import ticket from '../models/ticket.js';
import supertest from 'supertest';


describe('Test de la méthode DELETE', () => {
  it("DELETE USER => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    var idUser ='65da5b3b84885d8ef2cc1755'
    supertest(app)
      .delete(`/user/delete/${idUser}`)
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("DELETE Ticket => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    var idTicket ='65e8c3cc5b82271638d21d21'
    supertest(app)
      .delete(`/ticket/delete/${idTicket}`)
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("DELETE Hôtel => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
    var idHotel ='65e5041e3dbbdc5ea66a1236'
    supertest(app)
      .delete(`/hotel/delete/${idHotel}`)
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
