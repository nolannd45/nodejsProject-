import supertest from "supertest";
import {app} from "../index.js";
// test POST
describe("POST /", function() {
  it("Login => code 200", function(done) {
    supertest(app)
      .post("/login")
      .send({"pseudo": "nolannd", "password": "nolannd"})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });

  it("Create Hotel => code 201", function(done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"

    supertest(app)
      .post("/hotel/create")
      .set('Authorization', 'Bearer ' + tokenTest) // Adding token to headers
      .send({"name": "Georges V", "location": "Tours", "description": "Cet hôtel est génial", "picture_list": ["hotel1"]})
      .expect(201)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });

  it("Create User => code 201", function(done) {  
      supertest(app)
        .post("/user/create")
        .send({"email": "test@test2.fr", "pseudo": "test2", "password": "test"})
        .expect(201)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });

    it("Create Ticket => code 201", function(done) {
      var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"

    supertest(app)
      .post("/ticket/create")
      .set('Authorization', 'Bearer ' + tokenTest) // Adding token to headers
      .send({"idUser": "65da5b3b84885d8ef2cc1754", "idHotel": "65e4cbd12d34b38342b18af9", "dateStart": "2024-03-18T00:00:00.000+00:00", "dateEnd": "2024-03-29T00:00:00.000+00:00"})
      .expect(201)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});