import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import * as UserController from '../controlers/user.js';
import * as loginController from '../controlers/login.js';
import * as ticketController from '../controlers/ticket.js';
import * as hotelController from '../controlers/hotel.js';
import ticket from '../models/ticket.js';
import hotel from '../models/hotel.js';
import user from '../models/user.js';

describe('Delete Method', () => {
  describe('delete', () => {

    it('should delete a user', async () => {
      const req = {
          user: {
              email: 'nolannd@gmail.com',
              pseudo: 'nolannd',
              password: 'nolannd',
              role: "admin"
          },
          params:{
              id :"65da5b3b84885d8ef2cc1756"
          }
      };
      const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub()
      };
  
      await UserController.delUser(req, res);
  
      // Assert that the response status is set to 200
      expect(res.status.calledWith(200)).to.be.true;
  });

  it('should delete an hotel', async () => {
    const req = {
      user: {
        email: 'nolannd@gmail.com',
        pseudo: 'nolannd',
        password: 'nolannd',
        role:"admin"
      },
      params:{
        id :"65e5041e3dbbdc5ea66a1237"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    await hotelController.delHotel(req, res);

    expect(res.status.calledWith(200)).to.be.true;

  });
  


    

  });
});
