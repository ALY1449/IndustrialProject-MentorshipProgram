import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const FetchMenteesWithMentors = createAsyncThunk(
  "dashboard/getWithMentors",
  async () => {
    let getWithMentors = 0;
    const q = query(
      collection(database, "Mentees"),
      where("status", "==", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      getWithMentors += 1;
    });
    return getWithMentors;
  }
);
