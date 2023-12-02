import axios from "axios";
import { BASE_URL, GET_ACTIVE_CHAT, GET_ALL_CHATS } from "../variables";

export const getAllChatsApi = (token, success, fail) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}${GET_ALL_CHATS}`,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status === 200) success && success(response);
  } catch (error) {
    fail && fail(error.response);
  }
};

export const getActiveChatApi =
  (token, roomId, success, fail) => async (dispatch) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}${GET_ACTIVE_CHAT}/${roomId}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.status === 200) success && success(response);
    } catch (error) {
      fail && fail(error.response);
    }
  };
