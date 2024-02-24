import Ticket from "../models/ticket.js";

const listTicket = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(201).send(tickets);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

const delTicket = async (req, res) => {
    try {
      if (req.user.role == "admin" || req.params.id == req.user.id){
        const removed = await Ticket.findByIdAndRemove(req.params.id);
        if (!removed) {
          res.sendStatus(404);
          return;
        }
        res.status(200).send(removed);
    }
    else{
      res.status(403).send('Vous ne disposez pas des droits pour modifier cette personne');
    }
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
      console.log(error);
    }
  };

  export async function validate(req, res){
      try {
        var use = true
        const update = await Ticket.findByIdAndUpdate(req.params.id, {
          use: true
        });
        res.status(200).send(update);
      } catch (error) {
        if (error.kind && error.kind === "ObjectId") {
          res.sendStatus(404);
          return;
        }
        res.sendStatus(500);
      }
  };

  
export {listTicket, delTicket};