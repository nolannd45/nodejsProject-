import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';


import {connect, disconnect} from './utils/mongo.js';


import routeUser from "./routes/routeUser.js";
import routeHotel from "./routes/routeHotel.js";
import routeTicket from "./routes/routeTicket.js";

import {login,logout} from "./controlers/login.js";


// DB CONNECTION
await connect()

const app = express()

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3001, () => {
  console.log('API listening on port 3001!')
})

app.post("/login", login);
app.post("/logout", logout);

app.use("/user", routeUser);
app.use("/hotel", routeHotel);
app.use("/ticket", routeTicket);

export {app};








