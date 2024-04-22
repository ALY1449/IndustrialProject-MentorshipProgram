"use client";

import { FetchNoMentors } from "@/app/redux/features/registration/actions/dashboard/FetchNoMentors";
import { FetchNoMentees } from "@/app/redux/features/registration/actions/dashboard/FetchNoMentees";
import { FetchMenteesPairedOnThisDay } from "@/app/redux/features/registration/actions/dashboard/FetchMenteesPairedOnThisDay";
import { FetchMentorsPairedOnThisDay } from "@/app/redux/features/registration/actions/dashboard/FetchMentorsPairedOnThisDay";
import { useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Paper, Skeleton, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { APIStatus } from "@/app/redux/features/registration/dashboardSlice";

interface PairingsMadeTrackerProps {
  chosenDate: Dayjs;
}
const PairingsMadeTracker: React.FC<PairingsMadeTrackerProps> = ({
  chosenDate,
}) => {
  const dispatch = useAppDispatch();
  const pairedMenteesOnSpecificDay = useSelector(
    (state: RootState) => state.dashboard.getTotalMenteesSpecificDay
  );
  const pairedMentorsOnSpecificDay = useSelector(
    (state: RootState) => state.dashboard.getTotalMentorsSpecificDay
  );
  const getTotalMenteesSpecificDayStatus = useSelector(
    (state: RootState) => state.dashboard.getTotalMenteesSpecificDayStatus
  );
  const getTotalMentorsSpecificDayStatus = useSelector(
    (state: RootState) => state.dashboard.getTotalMentorsSpecificDayStatus
  );

  useEffect(() => {
    dispatch(FetchMenteesPairedOnThisDay(chosenDate.format("ddd MMM D YYYY")));
    dispatch(FetchMentorsPairedOnThisDay(chosenDate.format("ddd MMM D YYYY")));
  }, [chosenDate, dispatch]);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        {getTotalMenteesSpecificDayStatus !== APIStatus.success ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ backgroundColor: "#F4E6F2", borderRadius: "5px" }}
          />
        ) : (
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
        )}
        {getTotalMentorsSpecificDayStatus !== APIStatus.success ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ backgroundColor: "#F4E6F2", borderRadius: "5px" }}
          />
        ) : (
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
        )}
      </Stack>
    </div>
  );
};

export default PairingsMadeTracker;
