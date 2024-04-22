import database from "@/app/firestore/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    let totalMentees = 0;
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalMentees += 1;
    });
    return Response.json(totalMentees);
  } catch (error) {
    throw error;
  }
}
