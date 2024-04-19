import database from "../../../../../../../firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const FetchMentorsWithMentees = createAsyncThunk(
  "dashboard/getWithMentees",
  async () => {
    let totalWithMentees = 0;
    const q = query(
      collection(database, "Mentors"),
      where("status", "==", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalWithMentees += 1;
    });
    return totalWithMentees;
  }
);
