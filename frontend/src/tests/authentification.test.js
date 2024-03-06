import supertest from "supertest";
import {app} from "../index.js";

describe("Login /", function() {
  it("Code de statut de réponse HTTP 200", function(done) {
    supertest(app)
      .post("/login")
      .send({"pseudo": "nolannd", "password": "nolannd"})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});