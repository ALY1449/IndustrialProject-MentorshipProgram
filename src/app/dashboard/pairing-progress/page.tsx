"use client";
import { FetchTotalMentors } from "@/app/redux/features/registration/actions/dashboard/FetchTotalMentors";
import { FetchTotalMentees } from "@/app/redux/features/registration/actions/dashboard/FetchTotalMentees";
import { FetchNoMentors } from "@/app/redux/features/registration/actions/dashboard/FetchNoMentors";
import { FetchNoMentees } from "@/app/redux/features/registration/actions/dashboard/FetchNoMentees";
import { FetchMentorsWithMentees } from "@/app/redux/features/registration/actions/dashboard/FetchMentorsWithMentees";
import { FetchMenteesWithMentors } from "@/app/redux/features/registration/actions/dashboard/FetchMenteesWithMentors";
import { useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Box, Chip, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { APIStatus } from "@/app/redux/features/registration/dashboardSlice";
import ChipSkeleton from "../skeletons/chipsSkeleton/page";

const PairingProgress: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalMentors = useSelector(
    (state: RootState) => state.dashboard.totalMentors
  );
  const totalMentorsStatus = useSelector(
    (state: RootState) => state.dashboard.totalMentorsStatus
  );
  const totalMentees = useSelector(
    (state: RootState) => state.dashboard.totalMentees
  );
  const totalMenteesStatus = useSelector(
    (state: RootState) => state.dashboard.totalMenteesStatus
  );
  const noMentors = useSelector(
    (state: RootState) => state.dashboard.noMentors
  );
  const noMentorsStatus = useSelector(
    (state: RootState) => state.dashboard.noMentorsStatus
  );
  const noMentees = useSelector(
    (state: RootState) => state.dashboard.noMentees
  );
  const noMenteesStatus = useSelector(
    (state: RootState) => state.dashboard.noMenteesStatus
  );
  const withMentors = useSelector(
    (state: RootState) => state.dashboard.withMentors
  );
  const withMentorsStatus = useSelector(
    (state: RootState) => state.dashboard.withMentorsStatus
  );
  const withMentees = useSelector(
    (state: RootState) => state.dashboard.withMentees
  );
  const withMenteesStatus = useSelector(
    (state: RootState) => state.dashboard.withMenteesStatus
  );

  useEffect(() => {
    dispatch(FetchTotalMentors());
    dispatch(FetchTotalMentees());
    dispatch(FetchNoMentors());
    dispatch(FetchNoMentees());
    dispatch(FetchMenteesWithMentors());
    dispatch(FetchMentorsWithMentees());
  }, [dispatch]);

  return (
    <Box>
      <Grid container maxWidth="100%">
        <Grid item xs={3}>
          <CircularProgress variant="determinate" value={25} size={100} />
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {totalMentorsStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`Total mentors ${totalMentors}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
            <Grid item>
              {withMenteesStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`With Mentees ${withMentees}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
            <Grid item>
              {noMenteesStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`With No Mentees ${noMentees}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CircularProgress variant="determinate" value={50} size={100} />
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {totalMenteesStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`Total mentees ${totalMentees}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
            <Grid item>
              {withMentorsStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`With Mentors ${withMentors}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
            <Grid item>
              {noMentorsStatus !== APIStatus.success ? (
                <ChipSkeleton />
              ) : (
                <Chip
                  label={`With No Mentors ${noMentors}`}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PairingProgress;
