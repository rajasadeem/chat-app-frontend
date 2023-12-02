import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setAllChats } from "../../redux/slice/chat.slice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getActiveChatApi, getAllChatsApi } from "../../apis/chat";
import { useEffect, useState } from "react";

const useChat = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state?.user?.user_data;
  const chats = state?.chat?.all_chats;
  const activeChat = state?.chat?.active_chat;

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");

  const fetchAllChats = () => {
    setLoading(true);
    let success = (response) => {
      setLoading(false);
      dispatch(setAllChats(response?.data?.data));
    };
    let fail = (response) => {
      setLoading(false);
      toast.error(response?.data?.message);
    };
    dispatch(getAllChatsApi(token, success, fail));
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  const getActiveChat = () => {
    let success = (response) => dispatch(setActiveChat(response?.data?.data));
    let fail = (response) => toast.error(response?.data?.message);
    dispatch(getActiveChatApi(token, roomId, success, fail));
  };

  useEffect(() => {
    if (roomId) {
      getActiveChat();
    }
  }, [roomId]);

  return {
    user,
    chats,
    setRoomId,
    activeChat,
    userId,
  };
};

export default useChat;
