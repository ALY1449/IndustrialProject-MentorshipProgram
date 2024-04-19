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

const PairingProgress: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalMentors = useSelector(
    (state: RootState) => state.dashboard.totalMentors
  );
  const totalMentees = useSelector(
    (state: RootState) => state.dashboard.totalMentees
  );
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
              <Chip
                label={`Total mentors ${totalMentors}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Chip
                label={`With Mentees ${withMentees}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Chip
                label={`With No Mentees ${noMentees}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CircularProgress variant="determinate" value={50} size={100} />
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Chip
                label={`Total mentees ${totalMentees}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Chip
                label={`With Mentors ${withMentors}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Chip
                label={`With No Mentors ${noMentors}`}
                variant="outlined"
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PairingProgress;
