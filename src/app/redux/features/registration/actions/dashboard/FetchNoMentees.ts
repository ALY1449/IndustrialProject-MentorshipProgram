import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchNoMentees = createAsyncThunk(
  "dashboard/getNoMentees",
  async () => {
    try {
      const response = await axios.get<number>(`api/noMentees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
