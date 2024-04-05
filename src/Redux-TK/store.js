import { configureStore } from "@reduxjs/toolkit";
import teachersSlice from "./Slices/Teacher";
import UserId from "./Slices/UserId";
import UserInfo from "./Slices/CurrentUserInfo";

const store = configureStore({
  reducer: {
    teachers: teachersSlice,
    userId: UserId,
    userInfo: UserInfo,
  },
});

export default store;
