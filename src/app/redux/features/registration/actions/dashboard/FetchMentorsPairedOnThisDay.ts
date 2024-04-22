import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchMentorsPairedOnThisDay = createAsyncThunk(
  "dashboard/getPairedMentorsOnSpecificDay",
  async (data: string) => {
    try {
      const response = await axios.get<number>(
        `api/mentorsPairedOnThisDay/${data}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
