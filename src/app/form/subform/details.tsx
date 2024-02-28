'use client';

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mentorDetails } from "@/app/redux/features/registration/registrationSlice";
import { MentorDetails } from "@/app/redux/features/registration/state/details/mentorDetails";

const Details: React.FC<ChildProps> = (props) => {
     const [mentorDetails, setMentorDetails] = useState<MentorDetails>({
        fullName: '',
        degree: '',
        organisation: '',
        industry: '',
        specialisation: ''
    });

    const handleChange = (fieldName: keyof MentorDetails, value: string) => {
        setMentorDetails((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    }

    useEffect(()=>{
        props.mentorDetails(mentorDetails);
    })
     
    return(
        <Box>
            <Container fixed>
                <Typography sx={{margin:'1%'}}>Full Name</Typography>
                <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('fullName', e.target.value)}/>
                <Typography sx={{margin:'1%'}}>Degree</Typography>
                <TextField  sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('degree', e.target.value)}/>
                <Typography sx={{margin:'1%'}}>Organisation</Typography>
                <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('organisation', e.target.value)}/>
                <Typography sx={{margin:'1%'}}>Industry</Typography>
                <TextField  sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('industry', e.target.value)}/>
                <Typography sx={{margin:'1%'}}>Specialisation</Typography>
                <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('specialisation', e.target.value)}/>
            </Container>
        </Box>
    )
}

export default Details;