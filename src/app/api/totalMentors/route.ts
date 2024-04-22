import database from "@/app/firestore/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    let totalMentors = 0;
    const q = query(
      collection(database, "Mentors"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalMentors += 1;
    });
    return Response.json(totalMentors);
  } catch (error) {
    throw error;
  }
}
