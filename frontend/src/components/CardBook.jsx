import { func } from "prop-types";
import React from "react";
import { API } from "../utils/API";
import { Link, useNavigate } from "react-router-dom";

const CardBook = ({ img, hotelName, dateStart, dateEnd, ticketId }) => {
  const navigate = useNavigate();

//   function deleteTicket() {
//     load(ticketId);
//   }

//   async function load(ticketId) {
//     var result = await API.deleteTicket(ticketId);
//     // navigate("/");
//   }

  return (
    <div className="md:w-80 md:h-80 w-32 h-32 flex flex-col" title={hotelName}>
      <img
        style={{ width: 400, height: 200 }}
        src={require(`/src/imageHotel/${img}.jpg`)}
        alt="Im@ge"
        className="w-full h-full rounded-t-md"
      />

      <span className="p-4 text-lg text-black font-semibold ">
        {hotelName.slice(0, 25)}
      </span>
      <span className="p-4 text-lg text-black font-semibold ">
        {dateStart} - {dateEnd}
      </span>
      {/* <button
        className="bg-black text-white font-semibold rounded-full p-3 cursor-pointer "
        onClick={deleteTicket(ticketId)}
      >
        Supprimer
      </button> */}
    </div>
  );
};

export default CardBook;
