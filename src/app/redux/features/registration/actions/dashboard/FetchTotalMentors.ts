import database from "../../../../../../../firestoreCredentials/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, where, getDocs } from "firebase/firestore";

export const FetchTotalMentors = createAsyncThunk(
  "dashboard/getTotalMentors",
  async () => {
    let totalMentors = 0;
    const q = query(
      collection(database, "Mentors"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalMentors += 1;
    });
    return totalMentors;
  }
);
