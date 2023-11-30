import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../variables";
import { toast } from "react-toastify";

export const signupApi = (payload, success, fail) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}user/register`,
      data: payload,
    });

    if (response?.status === 201) {
      success && success(response);
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      fail && fail(error?.response);
    } else {
      toast.error("Server Error: " + error.response.status);
    }
  }
};

export const loginApi = (payload, success, fail) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}user/login`,
      data: payload,
    });

    if (response?.status === 200) {
      success && success(response);
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      fail && fail(error?.response);
    } else {
      toast.error("Server Error: " + error.response.status);
    }
  }
};
export const getUserDataApi =
  (id, token, success, fail) => async (dispatch) => {
    try {
      let response;
      if (id) {
        response = await axios({
          method: "post",
          url: `${BASE_URL}user/${id}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios({
          method: "post",
          url: `${BASE_URL}user/`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response?.status === 200) {
        success && success(response);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        fail && fail(error?.response);
      } else {
        toast.error("Server Error: " + error.response.status);
      }
    }
  };
