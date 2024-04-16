"use client";

import {
  getNoMentees,
  getNoMentors,
  getWithMentees,
  getWithMentors,
} from "@/app/redux/features/registration/dashboardSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface PairingsMadeTrackerProps {
  pairedMentees: number;
  pairedMentors: number;
  remaining: number;
}
const PairingsMadeTracker: React.FC = () => {
  const dispatch = useAppDispatch();
  const noMentors = useSelector(
    (state: RootState) => state.dashboard.noMentors
  );
  const noMentees = useSelector(
    (state: RootState) => state.dashboard.noMentees
  );
  const withMentors = useSelector(
    (state: RootState) => state.dashboard.withMentors
  );
  const withMentees = useSelector(
    (state: RootState) => state.dashboard.withMentees
  );

  useEffect(() => {
    dispatch(getNoMentors());
    dispatch(getNoMentees());
    dispatch(getWithMentees());
    dispatch(getWithMentors());
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
          {withMentors} MENTEE(s)
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
          {withMentees} MENTOR(s)
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {noMentors + noMentees} more unpaired
        </Paper>
      </Stack>
    </div>
  );
};

export default PairingsMadeTracker;
