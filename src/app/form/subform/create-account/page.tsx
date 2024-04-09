'use client';

import { Box, TextField, Container, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Radio, RadioGroup, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { UserState } from "@/app/redux/features/registration/state/user/user";
import '../style.css'
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface CreateAccountProps {
    createAccountData: (data: UserState) => void; 
}

const CreateAccount: React.FC<CreateAccountProps> = ({createAccountData}) => {

    const mentorState = useSelector((state: RootState)=> state.registration.user);
    const menteeState = useSelector((state: RootState)=> state.registration.user);

    const [values, setValues] = useState<UserState>(() => {
        if (mentorState.mentor) {
            return {
                fullName: mentorState.fullName,
                phoneNumber: mentorState.phoneNumber,
                gender: mentorState.gender,
                emailAddress: mentorState.emailAddress,
                mentor: mentorState.mentor,
                mentee: undefined,
                age: mentorState.age,
                currentStage: mentorState.currentStage
            };
        } else {
            return {
                fullName: menteeState.fullName,
                phoneNumber: menteeState.phoneNumber,
                gender: undefined,
                emailAddress: menteeState.emailAddress,
                mentor: undefined,
                mentee: menteeState.mentee,
                age: menteeState.age,
                currentStage: menteeState.currentStage
            };
        }
    });
    

    //Mentee extends user state
    const handleChange = (fieldName: keyof UserState, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value
        }));
    };

    useEffect(()=>{
        createAccountData(values);
    })
    

    return(
        <Box>
          <Container sx={{padding: '5%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Full Name</Typography>
                        <TextField
                            id="fullName"
                            sx={{ m: 1, width: '35ch' }}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            value={menteeState.fullName !== undefined ? menteeState.fullName : ''}
                    />
                </div>
                {values.mentor && (
                    <div>
                        <Typography sx={{margin:'1%', paddingTop:'10px'}}>Gender</Typography>
                        <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{margin:'1%'}}
                        >
                        <FormControlLabel value="Female" control={<Radio onChange={() => handleChange('gender', 'female')}/>} label="Female" />
                        <FormControlLabel value="Male" control={<Radio onChange={() => handleChange('gender', 'male')}/>} label="Male" />
                        <FormControlLabel value="Other" control={<Radio onChange={() => handleChange('gender', 'other')}/>} label="Other" />
                        </RadioGroup> 
                    </div>
                )}
                {values.mentee && (
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{margin:'1%'}}>Age</Typography>
                    <TextField
                        id="age"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('age', e.target.value)}
                        value={menteeState.age  !== undefined ? menteeState.age : ""}
                    />
                    </div>
                )}
                <div style={{display: 'flex', alignItems: 'center', gap: '6%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Email Address</Typography>
                    <TextField
                        id="emailAddress"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('emailAddress', e.target.value)}
                        value={menteeState.emailAddress !== undefined ? menteeState.emailAddress : ''}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Phone Number</Typography>
                    <TextField
                        id="phoneNumber"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        value={menteeState.phoneNumber !== undefined ? menteeState.phoneNumber : ''}
                    />
                </div>
                {values.mentee && (
                    <div>
                        <Typography sx={{margin:'1%', paddingTop:'10px'}}>What is your current education/career stage?</Typography>
                        <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{margin:'1%'}}
                                value={menteeState.currentStage !== undefined ? menteeState.currentStage : ''}
                                onChange={(e)=> handleChange('currentStage', e.target.value)}
                        >
                        <FormControlLabel value="Undergraduate/Graduate" control={<Radio/>} label="Undergraduate/Graduate" />
                        <FormControlLabel value="Postgraduate" control={<Radio/>} label="Post Graduate" />
                        <FormControlLabel value="Professional" control={<Radio/>} label="Professional" />
                        </RadioGroup> 
                    </div>
                )}
          </Container>
        </Box>  
    )
}

export default CreateAccount;