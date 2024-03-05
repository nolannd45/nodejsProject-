import React, { useEffect, useState } from "react";
import { API } from "../utils/API";
import CardBook from "./CardBook";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


const MyBook = () => {
  const [data, setData] = useState([]);
  var [hotels, setHotels] = useState([]);

  async function load() {
    await log();
  }

  useEffect(() => {
    const getData = async () => {
      await load();
      setData(hotels);
    };
    getData();
  }, []);

  async function log() {
    let result = await API.fetchTickets();

    for (var tickets in result) {
      var hotel = await API.fetchById(result[tickets].idHotel);
      hotel["dateStart"]=dayjs(result[tickets].dateStart).format("MM/DD/YYYY")
      hotel["dateEnd"]=dayjs(result[tickets].dateEnd).format("MM/DD/YYYY")
      hotels.push(hotel);
      console.log(hotels)
      setHotels(hotels);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-white my-4 text-start">
        {" "}
        Vos réservations
      </h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {data &&
          data?.map((item) => {
            return (
            <Link
                key={item?._id}
                className="bg-purple-600 rounded-md hover:scale-105 duration-200"
                to={`/hotels/${item?._id}`}
              >
            <CardBook hotelName={item?.name} img={item?.picture_list[0]} dateStart={item?.dateStart} dateEnd={item?.dateEnd} />
            </Link>)
          })}
      </div>
    </>
  );
};

export default MyBook;
