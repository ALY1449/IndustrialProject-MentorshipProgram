import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchTotalMentors = createAsyncThunk(
  "dashboard/getTotalMentors",
  async () => {
    try {
      const response = await axios.get<number>(`api/totalMentors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
