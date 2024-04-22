import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HomeTableData } from "../../state/dashboard/home-table-data";

export const FetchCollection = createAsyncThunk<HomeTableData[]>(
  "dashboard/FetchMenteeCollection",
  async () => {
    try {
      const res = await axios.get<HomeTableData[]>("/api");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
