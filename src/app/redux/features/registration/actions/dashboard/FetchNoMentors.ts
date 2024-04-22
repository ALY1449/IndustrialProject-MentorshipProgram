import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchNoMentors = createAsyncThunk(
  "dashboard/getNoMentors",
  async () => {
    try {
      const response = await axios.get<number>(`api/noMentors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
