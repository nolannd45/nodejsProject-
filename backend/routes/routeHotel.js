import {createHotel, delHotel, readHotel, readHotelId, updateHotel , readHotelSorted} from '../controlers/hotel.js';
import express from "express";
import token from "../middlewares/token.js";


const routeHotel = express.Router();

routeHotel.post("/create",token ,createHotel);//connexion + admin only
routeHotel.delete("/delete/:id",token,delHotel);//connexion + admin only
routeHotel.get("/this/:id", readHotelId);//dont need connexion
routeHotel.get("/read", readHotelSorted);//dont need connexion
routeHotel.patch("/update/:id",token,updateHotel);//connexion + admin only

export default routeHotel;