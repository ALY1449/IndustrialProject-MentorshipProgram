import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { HomeTableData } from "../../state/dashboard/home-table-data";
import { Status } from "../../state/dashboard/status/status";
import axios from "axios";

export const UpdateStatustoInProgress = createAsyncThunk(
  "registration/updateDocInProgressStatus",
  async (data: HomeTableData) => {
    try {
      if (data.participatingAs == "Mentee") {
        const response = await axios.post(
          `api/updateMenteeStatusToInProgress/${data.fullName}`
        );
        return response.data;
      } else {
        const response = await axios.post(
          `api/updateMentorStatusToInProgress/${data.fullName}`
        );
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
