import axios from "axios";
import {
  BASE_URL_HOTEL,
  BASE_URL_TICKET,
  BASE_URL_LOGIN,
  BASE_URL_USER,
} from "../config";

export class API {
  static async fetchById(id) {
    const response = await axios.get(`${BASE_URL_HOTEL}/this/${id}`);
    console.log(response);
    return response.data;
  }

  static async fetchAllHotel() {
    const response = await axios.get(`${BASE_URL_HOTEL}/read`);
    console.log(response);
    return response.data;
  }

  static async userById(id) {
    const response = await axios.get(`${BASE_URL_USER}/readById/${id}`);
    return response.data;
  }

  //TICKET

  static async createTicket(idHotel, startDate, endDate) {
    const token = localStorage.getItem("token");
    const info = {
      idHotel: idHotel,
      dateStart: startDate,
      dateEnd: endDate,
    };
    console.log(info)
    try {
      const response = await fetch(`${BASE_URL_TICKET}/create`, {
        method: "POST",
        body: JSON.stringify(info),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
      });
      console.log(response)
      return response
    } catch (error) {
      console.log("test")
      console.log(error.response);
      return error.response;
    }
  }

  static async fetchTickets() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL_TICKET}/myTickets`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
      });
      var tickets = await response.json()
      console.log(tickets)
      return tickets
      
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }

  static async deleteHotel(hotel) {
    const token = localStorage.getItem("token");
    var vid = { hotel: hotel };
    console.log(vid);
    const response = await fetch(`${BASE_URL_HOTEL}/delete/${hotel.id}`, {
      method: "DELETE",
      body: JSON.stringify(vid),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }

  static async deleteTicket(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL_TICKET}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }

  //CONNEXION
  static async login(pseudo, password) {
    try {
      const response = await axios.post(`${BASE_URL_LOGIN}`, {
        pseudo: pseudo,
        password: password,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async register(pseudo, email, password) {
    console.log(pseudo + " " + email + " " + password);
    try {
      await axios.post(`${BASE_URL_USER}/create`, {
        email: email,
        pseudo: pseudo,
        password: password,
      });
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }

  static async deleteUser(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL_USER}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  }

  //USER
  static async updateUser(user) {
    const token = localStorage.getItem("token");
    let test;

    await fetch(`${BASE_URL_USER}/update`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((responseJson) => {
      test = responseJson;
    });
    return test;
  }
}
