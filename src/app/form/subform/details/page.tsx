'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MentorProfessionalDetails } from "@/app/redux/features/registration/state/details/mentorDetails";
import { mentorProfessionalDetailsSelector } from "@/app/redux/selector";
import { useSelector } from "react-redux";

const Details: React.FC<ChildProps> = (props) => {
    const professionalDetailsState = useSelector(mentorProfessionalDetailsSelector);
     const [mentorDetails, setMentorDetails] = useState<MentorProfessionalDetails>({
        jobTitle: professionalDetailsState.jobTitle,
        organisation: professionalDetailsState.organisation,
        specialisation: professionalDetailsState.specialisation
    });

    const handleChange = (fieldName: keyof MentorProfessionalDetails, value: string) => {
        setMentorDetails((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    }

    useEffect(()=>{
        props.mentorProfessionalDetailsData(mentorDetails);
    })

    return(
        <Box>
            <Container fixed sx={{padding: '5%'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '9%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Job Title</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} 
                        value={professionalDetailsState.jobTitle !== undefined ? professionalDetailsState.jobTitle : ''} 
                        onChange={(e)=> handleChange('jobTitle', e.target.value)}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Organisation</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }}
                        value={professionalDetailsState.organisation !== undefined ? professionalDetailsState.organisation : ''} 
                        onChange={(e)=> handleChange('organisation', e.target.value)}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Specialisation</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} 
                        value={professionalDetailsState.specialisation !== undefined ? professionalDetailsState.specialisation : ''} 
                        onChange={(e)=> handleChange('specialisation', e.target.value)}/>
                </div>
            </Container>
        </Box>
    )
}

export default Details;