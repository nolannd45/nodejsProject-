import Hotel from "../models/hotel.js";
import Ticket from "../models/ticket.js";
import * as yup from 'yup';

export async function createHotel(req, res) {
  const { name, location, description, picture_list } = req.body;
  if (req.user.role == "admin"){
    const schema = yup.object().shape({
      name: yup.string().required(),
      location: yup.string().required(),
      description: yup.string().required(),
      picture_list: yup.array().required(),
    });
    let check = await schema.isValid(req.body)

    const checkIfExistName = await Hotel.findOne({ name });

    if (!checkIfExistName){
      try {
        if (check){
        const newHotel = new Hotel({ name, location, description, picture_list });
        const savedHotel = await newHotel.save();
        res.status(201).send(savedHotel);
        }
        else{
          res.status(400).send('Vous avez un problème avec un de vos attributs. Veuillez les verifier');
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {res.status(409).send('l hotel existe deja')};
  }else{
    res.status(403).send('Vous ne disposez pas des droits pour modifier cet hôtel');
  }
};

export async function delHotel(req, res){
    try {
      const removed = await Hotel.findByIdAndRemove(req.params.id);
      if (!removed) {
        res.sendStatus(404);
        return;
      }
      await Ticket.find( { "idHotel": removed.idHotel } ).deleteMany();
      res.status(200).send(removed);
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
      console.log(error);
    }
};

export async function readHotel (req, res){
    try {
      const hotels = await Hotel.find({});
      res.status(200).send(hotels);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
};

export async function readHotelId(req, res){
  try {
    const hotels = await Hotel.findById(req.params.id);
    if (hotels){
      res.status(200).send(hotels);
    }else {res.status(409).send('l hotel n\'existe pas ou plus.')}
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export async function updateHotel(req, res){
  const schema = yup.object().shape({
    name: yup.string(),
    location: yup.string(),
    description: yup.string(),
    picture_list: yup.array(),
  });
  let check = await schema.isValid(req.body)
  
    try {
      if (check){
        const { name, location, description, picture_list } = req.body;
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
          name,
          location,
          description,
          picture_list,
        });
        res.status(200).send(updatedHotel);
      }
      else{
        res.status(400).send('Vous avez un problème avec un de vos attributs. Veuillez les verifier');
      }
    } catch (error) {
      if (error.kind && error.kind === "ObjectId") {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
    }
};

export async function readHotelSorted (req, res){
  try {
    const hotels = await Hotel.find().sort({name : 1});
    res.status(200).send(hotels);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};