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

describe('Get Method', () => {
  describe('get', () => {
    it('should return list of tickets for user', async () => {
      const req = {
        user: {
          id: '65da5b3b84885d8ef2cc1754' // Utiliser un ID utilisateur valide
        }
      };

      const expectedTickets = [
        {
          "_id": "65e8c3cc5b82271638d21d22",
          "idUser": "65da5b3b84885d8ef2cc1754",
          "idHotel": "65e4cbd12d34b38342b18af9",
          "dateStart": "2024-11-14T00:00:00.000Z",
          "dateEnd": "2024-11-26T00:00:00.000Z",
          "createdAt": "2024-03-05T05:41:32.197Z",
          "updatedAt": "2024-03-05T05:41:32.197Z",
          "__v": 0
        }
      ];

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis()
      };

      // Mocking Ticket.find method to return expected tickets for the user ID
      sinon.stub(ticket, 'find').withArgs({ idUser: req.user.id }).resolves(expectedTickets);

      await ticketController.listTicket(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(expectedTickets)).to.be.true;

      // Restoring the stub after the test
      ticket.find.restore();
    });

    it('should return list of hotels', async () => {
      const req = {
        user: {
          id: '65da5b3b84885d8ef2cc1754' // Utiliser un ID utilisateur valide
        }
      };

      const expectedTickets = [
        {
            "_id": "65e4cbd12d34b38342b18af9",
            "name": "issouHotel",
            "location": "Paris",
            "description": "meilleur hotel du monde",
            "picture_list": ["hotel1", "test3"],
            "createdAt": "2024-03-04T13:00:02.003Z",
            "updatedAt": "2024-03-04T16:43:23.215Z",
            "__v": 0
        },
        {
            "_id": "65e5041e2dbbdc5ea66a1299",
            "name": "uwuHotel",
            "location": "Paris",
            "description": "meilleur hotel du monde",
            "picture_list": ["hotel2", "test3"],
            "createdAt": "2024-03-04T15:13:34.769Z",
            "updatedAt": "2024-03-04T16:44:01.921Z",
            "__v": 0
        }
    ];

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis()
      };

      // Mocking Ticket.find method to return expected tickets for the user ID
      sinon.stub(hotel, 'find').resolves(expectedTickets);

      await hotelController.readHotel(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(expectedTickets)).to.be.true;

      // Restoring the stub after the test
      hotel.find.restore();
    });

    it('should return list of users', async () => {
      const req = {
        user: {
          id: '65da5b3b84885d8ef2cc1754',
          pseudo: 'nolannd',
          role: 'admin',
          iat: 1709817809,
          exp: 1741375409
        }
      };

      const expectedTickets = [
        {
            "_id": "65da5b3b84885d8ef2cc1754",
            "email": "nolannd45@gmail.com",
            "pseudo": "nolannd",
            "password": "$2b$10$l3rxwAefVcCp1LVm4Dkxv.pdhVc6scN5shhI1PL5/0qbSpLGEHUYy",
            "role": "admin",
            "createdAt": "2024-03-04T10:56:59.257Z",
            "updatedAt": "2024-03-04T10:56:59.257Z",
            "__v": 0
        }
    ]

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis()
      };

      // Mocking Ticket.find method to return expected tickets for the user ID
      sinon.stub(user, 'find').resolves(expectedTickets);

      await UserController.readUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(expectedTickets)).to.be.true;

      // Restoring the stub after the test
      user.find.restore();
    });

  });
});
