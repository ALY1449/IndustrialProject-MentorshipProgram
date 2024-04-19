import database from "../../../../../../../firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const FetchMenteesPairedOnThisDay = createAsyncThunk(
  "dashboard/getPairedMenteesOnSpecificDay",
  async (data: string) => {
    let totalWithMentees = 0;
    const q = query(
      collection(database, "Mentees"),
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
