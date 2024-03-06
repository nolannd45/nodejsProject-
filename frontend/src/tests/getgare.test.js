import supertest from "supertest";
import {app} from "../index.js";

describe("GETgare /", function() {
  it("Code de statut de réponse HTTP 200", function(done) {
    supertest(app)
      .get("/gare/read")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});