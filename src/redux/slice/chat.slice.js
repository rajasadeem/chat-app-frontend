import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_chats: [],
  active_chat: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { setAllChats, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
