import { AUTH,  CLIENT_MSG } from "../constants/actionTypes";
import * as api from "../API";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data, status } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({
      type: CLIENT_MSG,
      message: { info: data.successMessage, status },
    });
    navigate("/");
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data, status } = await api.signUp(formData);
    dispatch({
      type: CLIENT_MSG,
      message: { info: data.successMessage, status },
    });
    if (data.successMessage === "Account created Successfully") {
      dispatch({ type: AUTH, data });
      navigate("/");
    }
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};

export const googleSignin = (token, navigate) => async (dispatch) => {
  try {
    const { data, status } = await api.googleSignIn(token);
    dispatch({ type: AUTH, data });
    dispatch({
      type: CLIENT_MSG,
      message: { info: data.successMessage, status },
    });
    navigate("/");
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};

export const resetPassword = (formData, navigate) => async (dispatch) => {
  try {
    const { data, status } = await api.resetPassword(formData);

    dispatch({
      type: CLIENT_MSG,
      message: { info: data.successMessage, status },
    });
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};
