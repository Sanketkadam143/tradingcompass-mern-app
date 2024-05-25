import {
  AUTH,
  LOGOUT,
  CLIENT_MSG,
  REGISTRATION,
} from "../constants/actionTypes";
import { socket } from "../API";

const authReducer = (
  state = { authData: null, message: null, isregister: null },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      socket.emit("login", action?.data?.token);
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null,isregister:null };

    case REGISTRATION:
      return { ...state, isregister: action.payload.isregister };

    case CLIENT_MSG:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default authReducer;
