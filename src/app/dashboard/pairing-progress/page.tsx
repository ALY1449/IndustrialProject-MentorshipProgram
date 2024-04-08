'use client';

import { getNoMentees, getNoMentors, getTotalMentees, getTotalMentors } from "@/app/redux/features/registration/actions/actions";
import { useAppDispatch } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Box, Chip, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PairingProgress: React.FC<ChildProps> = (props) =>{
    const dispatch = useAppDispatch();
    const totalMentors = useSelector((state: RootState) => state.dashboard.totalMentors)
    const totalMentees = useSelector((state: RootState) => state.dashboard.totalMentees)
    const noMentors = useSelector((state: RootState)=> state.dashboard.noMentors)
    const noMentees = useSelector((state: RootState)=> state.dashboard.noMentees)


    useEffect(()=>{
        dispatch(getTotalMentors());
        dispatch(getTotalMentees());
        dispatch(getNoMentors());
        dispatch(getNoMentees());
    },[dispatch])

    return(
        <Box>
            <Container >
                <Grid container maxWidth="60%">
                    <Grid item xs={3}>
                        <CircularProgress variant="determinate" value={25} size={100} />
                    </Grid>
                    <Grid item xs={3} direction="column">
                        <Grid
                            container
                            direction="column"
                            gap={2}
                        >
                        <Grid item xs={3} direction="column">
                            <Chip label={`Total mentors ${totalMentors}`} variant="outlined" color= "secondary" />
                        </Grid>
                        <Grid item xs={3} direction="column">
                        <Chip label={`No Mentees ${noMentees}`} variant="outlined" color= "secondary" />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <CircularProgress variant="determinate" value={50} size={100}/>
                    </Grid>
                    <Grid item xs={3} direction="column">
                        <Grid
                            container
                            direction="column"
                            gap={2}
                        >
                        <Grid item xs={3} direction="column">
                        <Chip label={`Total mentees ${totalMentees}`} variant="outlined" color= "secondary" />
                        </Grid>
                        <Grid item xs={3} direction="column">
                        <Chip label={`No mentors ${noMentors}`} variant="outlined" color= "secondary" />
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
            </Container>
        </Box>
    )
}

export default PairingProgress;