import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setAllChats } from "../../redux/slice/chat.slice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getActiveChatApi, getAllChatsApi } from "../../apis/chat";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../context";

const useChat = () => {
  const dispatch = useDispatch();

  const chatContainerRef = useRef(null);
  const state = useSelector((state) => state);
  const user = state?.user?.user_data;
  const chats = state?.chat?.all_chats;
  const activeChat = state?.chat?.active_chat;

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [message, setMessage] = useState("");

  const queryParam = searchParam.get("roomId");

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
    let chatId = roomId ? roomId : queryParam;
    let success = (response) => dispatch(setActiveChat(response?.data?.data));
    let fail = (response) => toast.error(response?.data?.message);
    dispatch(getActiveChatApi(token, chatId, success, fail));
  };

  useEffect(() => {
    if (roomId || queryParam) {
      getActiveChat();
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const onChangeMessageHandler = (e) => setMessage(e.target.value);

  const sendMessageHandler = () => {
    const receiver = queryParam
      ? queryParam.replace(userId, "")
      : roomId.replace(userId, "");
    const payload = {
      message,
      receiver,
      sender: userId,
    };
    socket.emit("sendMessage", payload);
    setMessage("");
  };

  return {
    user,
    chats,
    setRoomId,
    activeChat,
    userId,
    loading,
    setSearchParam,
    queryParam,
    chatContainerRef,
    onChangeMessageHandler,
    sendMessageHandler,
    message,
  };
};

export default useChat;
