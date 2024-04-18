"use client";

import {
  getNoMentees,
  getNoMentors,
  getPairedMenteesOnSpecificDay,
  getPairedMentorsOnSpecificDay,
  getWithMentees,
  getWithMentors,
} from "@/app/redux/features/registration/dashboardSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Paper, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface PairingsMadeTrackerProps {
  chosenDate: Dayjs;
}
const PairingsMadeTracker: React.FC<PairingsMadeTrackerProps> = ({
  chosenDate,
}) => {
  const dispatch = useAppDispatch();
  const noMentors = useSelector(
    (state: RootState) => state.dashboard.noMentors
  );
  const noMentees = useSelector(
    (state: RootState) => state.dashboard.noMentees
  );
  const pairedMenteesOnSpecificDay = useSelector(
    (state: RootState) => state.dashboard.getTotalMenteesSpecificDay
  );
  const pairedMentorsOnSpecificDay = useSelector(
    (state: RootState) => state.dashboard.getTotalMentorsSpecificDay
  );

  useEffect(() => {
    dispatch(
      getPairedMenteesOnSpecificDay(chosenDate.format("ddd MMM D YYYY"))
    );
    dispatch(
      getPairedMentorsOnSpecificDay(chosenDate.format("ddd MMM D YYYY"))
    );
  }, [chosenDate, dispatch]);

  useEffect(() => {
    dispatch(getNoMentors());
    dispatch(getNoMentees());
  }, [dispatch]);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            backgroundColor: "#F4E6F2",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {pairedMenteesOnSpecificDay} MENTEE(s)
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            backgroundColor: "#F4E6F2",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {pairedMentorsOnSpecificDay} MENTOR(s)
        </Paper>
      </Stack>
    </div>
  );
};

export default PairingsMadeTracker;
