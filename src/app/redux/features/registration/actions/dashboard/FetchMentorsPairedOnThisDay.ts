import database from "../../../../../../../firestoreCredentials/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const FetchMentorsPairedOnThisDay = createAsyncThunk(
  "dashboard/getPairedMentorsOnSpecificDay",
  async (data: string) => {
    let totalWithMentees = 0;
    const q = query(
      collection(database, "Mentors"),
      where("status", "==", Status.Completed),
      where("pairedDuring", "==", data)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalWithMentees += 1;
    });
    return totalWithMentees;
  }
);
