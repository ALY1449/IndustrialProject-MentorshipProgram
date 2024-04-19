import database from "../../../../../../../firestore/firestore";
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

export const UpdateStatustoInProgress = createAsyncThunk(
  "registration/updateDocInProgressStatus",
  async (data: HomeTableData) => {
    const collectionName =
      data.participatingAs == "Mentee" ? "Mentees" : "Mentors";
    const q = query(
      collection(database, collectionName),
      where("documentOf", "==", data.fullName)
    );
    const querySnapshot = await getDocs(q);

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, collectionName, docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.InProgress,
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  }
);
