import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const FetchMenteesPairedOnThisDay = createAsyncThunk(
  "mentees/fetchMenteesPairedOnThisDay",
  async (data: string) => {
    try {
      const response = await axios.get<number>(
        `/api/menteesPairedOnThisDay/${data}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
