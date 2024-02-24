import Hotel from "../models/hotel.js";
import Ticket from "../models/ticket.js";
import * as yup from 'yup';

export async function createHotel(req, res) {
  if (req.user.role == "admin"){
    const { namehotel, open_hour, close_hour, image } = req.body;
    const schema = yup.object().shape({
      namehotel: yup.string().required(),
      open_hour: yup.string().required(),
      close_hour: yup.string().required(),
      image: yup.string().required(),
    });
    let check = await schema.isValid(req.body)

  
    const checkIfExistName = await Hotel.findOne({ namehotel });

    if (!checkIfExistName){
      try {
        if (check){
        const { namehotel, open_hour, close_hour, image } = req.body;
        const newHotel = new Hotel({ namehotel, open_hour, close_hour, image });
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
    } else {res.status(409).send('la hotel existe deja')};
  }else{
    res.status(403).send('Vous ne disposez pas des droits pour modifier cette personne');
  }
};

export async function delHotel(req, res){
    try {
      const removed = await Hotel.findByIdAndRemove(req.params.id);
      if (!removed) {
        res.sendStatus(404);
        return;
      }
      await Ticket.find( { "end_station": removed.namehotel } ).deleteMany();
      await Ticket.find( { "start_station": removed.namehotel } ).deleteMany();
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
      res.status(201).send(hotels);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
};

export async function readHotelId(req, res){
  try {
    const hotels = await Hotel.findById(req.params.id);
    if (hotels){
      res.status(201).send(hotels);
    }else {res.status(409).send('l hotel n\'existe pas ou plus.')}
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export async function updateHotel(req, res){
  const schema = yup.object().shape({
    namehotel: yup.string(),
    open_hour: yup.string(),
    close_hour: yup.string(),
    image: yup.string(),
  });
  let check = await schema.isValid(req.body)
    try {
      const { namehotel, open_hour, close_hour, image } = req.body;
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
        namehotel,
        open_hour,
        close_hour,
        image,
      });
      res.status(200).send(updatedHotel);
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
    const hotels = await Hotel.find().sort({namehotel : 1});
    res.status(201).send(hotels);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};