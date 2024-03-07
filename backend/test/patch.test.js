import supertest from "supertest";
import { app } from "../index.js";

describe("PATCH /", function () {
  it("Update Hotel => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"
    var IdHotel = "65e5041e3dbbdc5ea66a1236";
    supertest(app)
      .patch(`/hotel/update/${IdHotel}`)
      .set("Authorization", "Bearer " + tokenTest) // Adding token to headers
      .send({ "location": "Tours" })
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("Update User => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"
    var IdUser = "65da5b3b84885d8ef2cc1755";
    supertest(app)
      .patch(`/user/update/${IdUser}`)
      .set("Authorization", "Bearer " + tokenTest) // Adding token to headers
      .send({"email": "test@test.com","pseudo" : "testtest","password": "test","role":"user"})
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
