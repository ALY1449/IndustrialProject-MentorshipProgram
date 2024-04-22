import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchMenteesWithMentors = createAsyncThunk(
  "dashboard/getWithMentors",
  async () => {
    try {
      const response = await axios.get<number>(`api/menteesWithMentors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
