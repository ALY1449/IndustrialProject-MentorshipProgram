import { MatchRow } from "@/app/dashboard/results/page";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UpdateStatustoComplete = createAsyncThunk(
  "registration/updateDocStatus",
  async (data: MatchRow) => {
    try {
      if (data.participatingAs == "Mentee") {
        const response = await axios.post(
          `api/updateMenteeStatusToComplete/${data.name}`
        );
        return response.data;
      } else {
        const response = await axios.post(
          `api/updateMentorStatusToComplete/${data.name}`
        );
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
