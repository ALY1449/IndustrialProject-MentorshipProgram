// pages/api/menteesPairedOnThisDay/[data].ts

import database from "@/app/firestore/firestore";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import { query, collection, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    // Extract the value of the dynamic parameter 'data'
    const data = context.params.data;
    let totalWithMentors = 0;
    const q = query(
      collection(database, "Mentees"),
      where("status", "==", Status.Completed),
      where("pairedDuring", "==", data)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalWithMentors += 1;
    });
    return NextResponse.json(totalWithMentors); // Sending the 'data' back as an example
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal error" });
  }
}
