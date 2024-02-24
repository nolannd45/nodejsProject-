import supertest from "supertest";
import {app} from "../index.js";

describe("GET /", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/train/read")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});
