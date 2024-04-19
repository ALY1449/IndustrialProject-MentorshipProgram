import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const FetchNoMentors = createAsyncThunk(
  "dashboard/getNoMentors",
  async () => {
    let total = 0;
    const q = query(
      collection(database, "Mentees"),
      where("status", "!=", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      total += 1;
    });
    return total;
  }
);
