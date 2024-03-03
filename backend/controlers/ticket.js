import Ticket from "../models/ticket.js";
import * as yup from 'yup';
import Hotel from "../models/hotel.js";

const listTicket = async (req, res) => {
    try {
        const tickets = await Ticket.find({ idUser: req.user.id });
        res.status(201).send(tickets);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  export async function createTicket(req, res) {
    const { nameHotel, dateStart, dateEnd } = req.body;
      const schema = yup.object().shape({
        nameHotel: yup.string().required("Le nom de l'hotel est obligatoire"),
        dateStart: yup.date().required("Une date de debut pour votre reservation est obligatoire"),
        dateEnd: yup.date().required("Une date de fin pour votre reservation est obligatoire"),
      });
      let check = await schema.isValid(req.body)
  
      const checkIfExist = await Hotel.findOne({ name: nameHotel });
      const idUser = req.user.id
  
      if (checkIfExist){
        try {
          if (check){            
            var idHotel = checkIfExist.id
            const checkIfReserv = await Ticket.findOne({ id: idHotel, dateStart: dateStart, dateEnd: dateEnd });
            console.log(checkIfReserv)
            if(!checkIfReserv) {
              const newTicket = new Ticket({ idHotel,idUser, dateStart, dateEnd });
              const savedTicket = await newTicket.save();
              res.status(201).send(savedTicket);
            }else{
              res.status(400).send('La chambre est déjà reservé');
            }
            
          }
          else{
            res.status(400).send('Vous avez un problème avec un de vos attributs. Veuillez les verifier');
          }
        } catch (error) {
          console.log(error);
          res.sendStatus(500);
        }
      } else {res.status(409).send("l'hotel n'existe pas ou la chambre est déjà reservé")};
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



  
export {listTicket, delTicket};