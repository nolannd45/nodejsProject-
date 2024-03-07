import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import * as UserController from '../controlers/user.js';
import * as loginController from '../controlers/login.js';
import * as ticketController from '../controlers/ticket.js';
import * as hotelController from '../controlers/hotel.js';

describe('Post Method', () => {
  describe('post', () => {
    it('should login', async () => {
      const req = {
        body: {
          pseudo: 'nolannd',
          password: 'nolannd'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
        cookie: sinon.stub(),
        json: sinon.stub()
      };

      await loginController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
    it('should not login', async () => {
      const req = {
        body: {
          pseudo: 'aa',
          password: 'aa'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
        cookie: sinon.stub(),
        json: sinon.stub()
      };

      await loginController.login(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });


    it('should create a new user', async () => {
      const req = {
        body: {
          email: 'yes1@yes.com',
          pseudo: 'yes',
          password: 'yes'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      await UserController.createUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith(`l'utilisateur ${req.body.pseudo} à bien été crée.`)).to.be.true;
    });

    it('should handle email already taken error', async () => {
      const req = {
        body: {
          email: 'nolannd@gmail.com',
          pseudo: 'nolannd',
          password: 'nolannd'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
      
      await UserController.createUser(req, res);

      expect(res.status.calledWith(409)).to.be.true;
      expect(res.send.calledWith("le pseudo est deja pris")).to.be.true;

    });
    it('should create a new hotel', async () => {
      const req = {
        body: 
      {
        "name": "Hotel2",
        "location": "Paris",
        "description": "meilleur hotel du monde",
        "picture_list": ["test","test"]
      },
      user: {
        id: '65da5b3b84885d8ef2cc1754',
        pseudo: 'nolannd',
        role: 'admin',
        iat: 1709817809,
        exp: 1741375409
      }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      await hotelController.createHotel(req, res);

      expect(res.status.calledWith(201)).to.be.true;
    });

    it('should create a new ticket', async () => {
      const req = {
        body: 
      {
        "idHotel": "65e4cbd12d34b38342b18af9",
        "dateStart": "2024-05-18T00:00:00.000+00:00", 
        "dateEnd": "2024-05-29T00:00:00.000+00:00"
      },
      user: {
        id: '65da5b3b84885d8ef2cc1754',
        pseudo: 'nolannd',
        role: 'admin',
        iat: 1709817809,
        exp: 1741375409
      }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      await ticketController.createTicket(req, res);

      expect(res.status.calledWith(201)).to.be.true;
    });

    // Add more test cases to cover other scenarios
  });

  // Add tests for other controller methods like delUser, readUser, updateUser, readById
});
