import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

const initialState = {
  users: [],
  status: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const res = await axios.get(`${url}/users`, setHeaders());
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default usersSlice.reducer;
