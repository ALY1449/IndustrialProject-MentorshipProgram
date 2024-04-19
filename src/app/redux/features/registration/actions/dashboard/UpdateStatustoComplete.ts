import { MatchRow } from "@/app/dashboard/results/page";
import database from "../../../../../../../firestoreCredentials/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Status } from "../../state/dashboard/status/status";

export const UpdateStatustoComplete = createAsyncThunk(
  "registration/updateDocStatus",
  async (data: MatchRow) => {
    const collectionName =
      data.participatingAs == "Mentee" ? "Mentees" : "Mentors";
    const q = query(
      collection(database, collectionName),
      where("documentOf", "==", data.name)
    );
    const querySnapshot = await getDocs(q);

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, collectionName, docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.Completed,
          assignedMentor: "Mentor name",
          pairedDuring: new Date().toDateString(),
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
  }
);
