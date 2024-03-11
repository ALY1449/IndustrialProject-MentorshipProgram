'use client';

import { Box, TextField, Container, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Radio, RadioGroup, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { UserState } from "@/app/redux/features/registration/state/user/user";
import '../style.css'
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const CreateAccount: React.FC<ChildProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const mentorState = useSelector((state: RootState)=> state.registration.user);
    const menteeState = useSelector((state: RootState)=> state.registration.user);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [values, setValues] = useState<UserState>(() => {
        if (mentorState.mentor) {
            return {
                fullName: mentorState.fullName,
                phoneNumber: mentorState.phoneNumber,
                gender: mentorState.gender,
                emailAddress: mentorState.emailAddress,
                password: mentorState.password,
                mentor: mentorState.mentor,
                mentee: undefined,
                age: 0,
                undergrad_or_grad: undefined,
                postgrad: undefined,
                professional: undefined
            };
        } else {
            return {
                fullName: menteeState.fullName,
                phoneNumber: menteeState.phoneNumber,
                gender: undefined,
                emailAddress: menteeState.emailAddress,
                password: menteeState.password,
                mentor: undefined,
                mentee: menteeState.mentee,
                age: 0,
                undergrad_or_grad: menteeState.undergrad_or_grad,
                postgrad: menteeState.postgrad,
                professional: menteeState.professional
            };
        }
    });
    

    //Mentee extends user state
    const handleChange = (fieldName: keyof UserState, value: string | boolean) => {
        setValues((prevValues) => ({
            ...prevValues,
            undergrad_or_grad: undefined,
            postgrad: undefined,
            professional: undefined,
            [fieldName]: value
        }));
    };

    useEffect(()=>{
        props.createAccountData(values);
    })


    return(
        <Box>
          <Container sx={{padding: '5%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Full Name</Typography>
                        <TextField
                            sx={{ m: 1, width: '35ch' }}
                            onChange={(e) => handleChange('fullName', e.target.value)}
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
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('age', e.target.value)}
                    />
                    </div>
                )}
                <div style={{display: 'flex', alignItems: 'center', gap: '6%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Email Address</Typography>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('emailAddress', e.target.value)}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Phone Number</Typography>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    />
                </div>
                {values.mentee && (
                    <div>
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
                    </div>
                )}
          </Container>
        </Box>  
    )
}

export default CreateAccount;

{/* <Typography sx={{margin:'1%'}} >Password</Typography>
                <OutlinedInput
                   sx={{ m: 1, width: '35ch' }}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    required
                    onChange={(e) => handleChange('password', e.target.value)}
                /> */}