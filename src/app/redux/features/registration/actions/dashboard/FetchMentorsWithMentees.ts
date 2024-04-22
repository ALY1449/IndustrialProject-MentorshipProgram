import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchMentorsWithMentees = createAsyncThunk(
  "dashboard/getWithMentees",
  async () => {
    try {
      const response = await axios.get<number>(`api/mentorsWithMentees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
