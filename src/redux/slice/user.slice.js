import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_data: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user_data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;
