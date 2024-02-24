

import { listTicket, delTicket, validate} from "../controlers/ticket.js";
import express from "express";
import token from "../middlewares/token.js";


const routeTicket = express.Router();

routeTicket.get("/myTickets",token ,listTicket);//need connexion
routeTicket.delete("/delete/:id",token ,delTicket);//need connexion
routeTicket.post("/validate/:id",token ,validate);//need connexion

export default routeTicket;