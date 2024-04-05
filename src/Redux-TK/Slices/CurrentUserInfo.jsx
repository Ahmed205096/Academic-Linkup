import { createSlice } from "@reduxjs/toolkit";

const UserInfo = createSlice({
  name: "UserInfo",
  initialState: {
    id: 0,
    name: "",
    img: "",
  },
  reducers: {
    setUserInfo: (state, action) => action.payload,
    getUserInfo: (state, action) => state,
  },
});

export const { setUserInfo, getUserInfo } = UserInfo.actions;

export default UserInfo.reducer;
