import supertest from "supertest";
import {app} from "../index.js";

let baseUrl = 'http://localhost:3000'
let token = 'some_authorization_token'
describe("POSTtrain /", function() {
  it("Code de statut de réponse HTTP 401", function(done) {
    
    supertest(app)
      .post("/train/create")
      .set({ "Authorization": `Bearer ${token}` })
      .send({nametrain: "test",start_station: "test1",end_station: "test", time_of_departure: "2027-03-03"})
      .expect(401)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

