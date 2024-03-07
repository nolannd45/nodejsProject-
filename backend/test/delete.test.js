import request from 'supertest';
import { app } from '../index.js';
import { expect } from 'chai';
import sinon from 'sinon';
import ticket from '../models/ticket.js';


describe('Test de la méthode DELETE', () => {
  it('devrait supprimer une ressource de la base de données', async () => {

      var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk3MzA3NTIsImV4cCI6MTcwOTgxNzE1Mn0.K-sLchFuZJO0CaQPZSeJRCmmMeRQ0likwg_dZXG9GX4"
      const resource = {"_id":"123","idUser":"65da5b3b84885d8ef2cc1754","idHotel":"65e4cbd12d34b38342b18af9","dateStart":{"$date":{"$numberLong":"1710288000000"}},"dateEnd":{"$date":{"$numberLong":"1710892800000"}},"createdAt":{"$date":{"$numberLong":"1709739070196"}},"updatedAt":{"$date":{"$numberLong":"1709739070196"}},"__v":{"$numberInt":"0"}};

      const findByIdAndRemoveStub = sinon.stub(ticket, 'findByIdAndRemove');
      findByIdAndRemoveStub.withArgs(resource._id).resolves(resource);

      const response = await request(app)
      .delete(`/ticket/delete/${resource._id}`)
      .set('Authorization', 'Bearer ' + tokenTest)

      expect(response.status).to.equal(200);

      sinon.assert.calledWith(findByIdAndRemoveStub, resource._id);

      findByIdAndRemoveStub.restore();
  });
});
