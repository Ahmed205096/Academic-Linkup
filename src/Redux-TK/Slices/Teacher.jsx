import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await fetch("http://localhost:4000/teachers");
    const data = await response.json();
    return data;
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default teachersSlice.reducer;

