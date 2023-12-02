import axios from "axios";
import { BASE_URL, GET_USER, LOGIN, SIGNUP } from "../variables";

export const signupApi = (payload, success, fail) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}${SIGNUP}`,
      data: payload,
    });
    if (response?.status === 201) success && success(response);
  } catch (error) {
    fail && fail(error?.response);
  }
};

export const loginApi = (payload, success, fail) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}${LOGIN}`,
      data: payload,
    });
    if (response?.status === 200) success && success(response);
  } catch (error) {
    fail && fail(error?.response);
  }
};

export const getUserDataApi =
  (id, token, success, fail) => async (dispatch) => {
    try {
      let URL;
      id ? (URL = `${GET_USER}?id=${id}`) : (URL = `${GET_USER}`);

      const response = await axios({
        method: "get",
        url: `${BASE_URL}${URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.status === 200) success && success(response);
    } catch (error) {
      fail && fail(error?.response);
    }
  };
