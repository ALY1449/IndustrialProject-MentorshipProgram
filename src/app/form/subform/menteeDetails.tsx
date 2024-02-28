'use client';

import { UserState, UserState } from "@/app/redux/features/registration/state/user/user";
import { Box, Container, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ChildProps } from "postcss";
import { useEffect, useState } from "react";

const MenteeDetails: React.FC<ChildProps> = (props) =>{
    const [values, setValues]= useState<UserState>({
        
    })

    const handleChange = (fieldName: keyof UserState, value: boolean) => { 

    }
    return(
        <Box>
            <Container fixed>
                <Typography sx={{margin:'1%', paddingTop:'10px'}}>What is your current education/career stage?</Typography>
                <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{margin:'1%'}}
                 >
                <FormControlLabel value="undergradorgrad" control={<Radio onChange={() => handleChange('undergrad_or_grad', true)}/>} label="Undergraduate/Graduate" />
                <FormControlLabel value="postgrad" control={<Radio onChange={() => handleChange('postgrad', true)}/>} label="Post Graduate" />
                <FormControlLabel value="professional" control={<Radio onChange={() => handleChange('professional', true)}/>} label="Professional" />
                </RadioGroup>
            </Container>
        </Box>
    )
}

export default MenteeDetails;