import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { query, collection, where, getDocs } from "firebase/firestore";

export const FetchTotalMentees = createAsyncThunk(
  "dashboard/getTotalMentees",
  async () => {
    try {
      const response = await axios.get<number>(`api/totalMentees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
