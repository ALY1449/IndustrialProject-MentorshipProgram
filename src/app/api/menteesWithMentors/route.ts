import database from "@/app/firestore/firestore";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const q = query(
      collection(database, "Mentees"),
      where("status", "==", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    return Response.json(querySnapshot.size);
  } catch (error) {
    throw error;
  }
}
