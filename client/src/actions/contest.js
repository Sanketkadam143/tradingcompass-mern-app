import * as api from "../API";
import { REGISTRATION,CLIENT_MSG } from "../constants/actionTypes";

export const registration = () => async (dispatch) => {
  try {
    const { data,status } = await api.contestRegistration();
    dispatch({ type: REGISTRATION, payload: data });
    dispatch({
        type: CLIENT_MSG,
        message: { info: data?.successMessage, status },
      });
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response?.data?.message,
        status: error.response?.status,
      },
    });
    console.log(error);
  }
};

export const getRegistration = () => async (dispatch) => {
  try {
    const  {data}  = await api.getRegistration();
    dispatch({ type: REGISTRATION, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response?.data?.message,
        status: error.response?.status,
      },
    });
    console.log(error);
  }
};
