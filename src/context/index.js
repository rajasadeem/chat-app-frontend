import io from "socket.io-client";
import { SOCKET_URL } from "../apis/variables";
import { useDispatch } from "react-redux";
import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { addNewMessageToChat } from "../redux/slice/chat.slice";

export const socket = io(SOCKET_URL);

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  useEffect(() => {
    socket.on(`receiveMessage:${userId}`, (data) => {
      dispatch(addNewMessageToChat(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider value={{ socket }}>{children}</AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
