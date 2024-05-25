import axios from "axios";
import io from "socket.io-client";
const token = JSON.parse(localStorage.getItem("profile"))?.token || null;

const API = axios.create({ baseURL: "http://localhost:5000/" });
export const socket = io.connect("http://localhost:5000/", {
  query: { token },
});

// const API = axios.create({ baseURL: process.env.REACT_APP_API });
// export const socket = io.connect(process.env.REACT_APP_API, {
//   query: { token },
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchOrders = () => API.get("/order");
export const placeOrder = (newOrder) => API.post("/order", newOrder);

export const updateOrder = (id, updatedOrder) =>
  API.patch(`/order/${id}`, updatedOrder);

export const deleteOrder = (id) => API.delete(`/order/${id}`);

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const googleSignIn = (token) => API.post("/users/googlesignin", token);

export const resetPassword = (formData) =>
  API.post("/users/resetpassword", formData);

export const contestRegistration=()=>API.post("contest/registration");
export const getRegistration=()=>API.get("contest/getregistration");
