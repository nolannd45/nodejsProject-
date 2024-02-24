import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from 'express';

import {connect, disconnect} from './utils/mongo.js';


import routeUser from "./routes/routeUser.js";
import routeHotel from "./routes/routeHotel.js";
import routeTicket from "./routes/routeTicket.js";

import login from "./controlers/login.js";
// DB CONNECTION
connect()

const app = express()

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('API listening on port 3000!')
})

app.post("/login", login);

app.use("/user", routeUser);
app.use("/hotel", routeHotel);
app.use("/ticket", routeTicket);

export {app};








