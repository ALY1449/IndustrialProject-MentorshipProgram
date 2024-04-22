import database from "@/app/firestore/firestore";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function POST(req: Request, context: any) {
  try {
    const name = context.params.data;
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "==", name)
    );
    const querySnapshot = await getDocs(q);

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, "Mentees", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.InProgress,
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });
    return Response.json({ message: "Successfully updated documents" });
  } catch (error) {
    throw error;
  }
}
