import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";
// const jwtToken = localStorage.getItem("userToken");

export const getProfile = createAsyncThunk(
  "profile/me",
  async (jwtToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "x-auth-token": jwtToken.jwtToken,
        },
      };
      console.log(jwtToken.jwtToken);
      const { data } = await axios.get(`${backendURL}/api/profile/me`, config);
      console.log(data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error_message) {
        console.log(error);
        return rejectWithValue(error.response.data.error_message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const registerProfile = createAsyncThunk(
  "api/profile",
  async (
    { jwtToken, company, location, status, skills, github },
    rejectWithValue
  ) => {
    try {
      // console.log(jwtToken);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": jwtToken,
        },
      };

      const data = await axios.post(
        `${backendURL}/api/profile/`,
        { company, location, status, skills, github },
        config
      );
      console.log(data);
      console.log(status, skills);
      return data;
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);
