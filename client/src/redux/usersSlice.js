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

export const usersDelete = createAsyncThunk("users/usersDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response?.data);
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
    [usersDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [usersDelete.fulfilled]: (state, action) => {
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload._id
      );
      state.users = newUsers;
      state.deleteStatus = "success";
      toast.error("User deleted!", {
        position: "bottom-left",
      });
    },
    [usersDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default usersSlice.reducer;
