import { createSlice } from "@reduxjs/toolkit";

const UserIDSlice = createSlice({
  name: "UserIDSlice",
  initialState: 0,
  reducers: {
    setId: (state, action) => action.payload,
    getId: (state, action) => state,
  },
});

export const { setId, getId } = UserIDSlice.actions;

export default UserIDSlice.reducer;
