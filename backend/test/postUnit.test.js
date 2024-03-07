import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import * as UserController from '../controlers/user.js';
import * as loginController from '../controlers/login.js';

describe('User Controller', () => {
  describe('createUser', () => {
    it('should login', async () => {
        const req = {
          body: {
            pseudo: 'nolannd',
            password: 'nolannd'
          }
        };
        const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub()
        };
  
        await loginController.login(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
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

    // Add more test cases to cover other scenarios
  });

  // Add tests for other controller methods like delUser, readUser, updateUser, readById
});
