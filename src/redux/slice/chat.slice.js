import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_chats: [],
  active_chat: [],
};

const add = (payload, data) => {
  return [...data, payload];
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllChats: (state, action) => {
      state.all_chats = action.payload;
    },
    setActiveChat: (state, action) => {
      state.active_chat = action.payload;
    },
    addNewMessageToChat: (state, action) => {
      state.active_chat = add(action.payload, state.active_chat);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllChats, setActiveChat, addNewMessageToChat } =
  chatSlice.actions;

export default chatSlice.reducer;
