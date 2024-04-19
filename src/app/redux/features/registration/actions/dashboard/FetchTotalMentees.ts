import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";

export const FetchTotalMentees = createAsyncThunk(
  "dashboard/getTotalMentees",
  async () => {
    let totalMentees = 0;
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalMentees += 1;
    });
    return totalMentees;
  }
);
