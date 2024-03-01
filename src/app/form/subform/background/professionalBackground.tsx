'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MultipleSelector from "../details/multipleSelector";
import industrySectorData from "../../data/industrySectorData";
import React from "react";
const ProfessionalBackground: React.FC<ChildProps> = (props) => {
    const [enrolledProgram, setEnrolledProgram] = useState();
    const [dataStore, setDataStore] = React.useState<string[]>([]);
    const handleChange = (fieldName: keyof ) => {

    }
    return(
        <Box>
            <Container>
                <div style={{display: 'flex', alignItems: 'center', gap: '11%'}}>
                    <Typography sx={{margin:'1%'}}>Job Title</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('jobTitle', e.target.value)}/>
                </div>
                <Typography sx={{margin:'1%'}}>What major/s are you currently enrolled in?</Typography>
                <MultipleSelector data={industrySectorData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
            </Container>
        </Box>
    )
}

export default ProfessionalBackground;