// pages/api/menteesPairedOnThisDay/[data].ts

import database from "@/app/firestore/firestore";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the value of the dynamic parameter 'data'
    const data = "Mon 22 Apr 2024";
    let totalWithMentees = 0;
    const q = query(
      collection(database, "Mentors"),
      where("status", "==", Status.Completed),
      where("pairedDuring", "==", data)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalWithMentees += 1;
    });
    return Response.json(totalWithMentees); // Sending the 'data' back as an example
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal error" });
  }
}
