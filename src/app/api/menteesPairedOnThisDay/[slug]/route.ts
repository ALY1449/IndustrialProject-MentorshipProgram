// pages/api/menteesPairedOnThisDay/[data].ts

import database from "@/app/firestore/firestore";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import { query, collection, where, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the value of the dynamic parameter 'data'
    const data = "Mon 22 Apr 2024";
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
    return Response.json(totalWithMentors); // Sending the 'data' back as an example
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal error" });
  }
}
