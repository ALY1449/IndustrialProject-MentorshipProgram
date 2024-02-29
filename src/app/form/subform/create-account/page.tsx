'use client';

import { Box, TextField, Container, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Radio, RadioGroup, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { UserState } from "@/app/redux/features/registration/state/user/user";
import '../style.css'
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const CreateAccount: React.FC<ChildProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const mentorState = useSelector((state: RootState)=> state.registration.user.mentor);
    const menteeState = useSelector((state: RootState)=> state.registration.user.mentee);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [values, setValues] = useState<UserState>({
        fullName: '',
        age: '',
        phoneNumber: '',
        gender: '',
        emailAddress: '',
        password: '',
        mentor: mentorState,
        mentee: menteeState,
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
    });

    const handleChange = (fieldName: keyof UserState, value: string | boolean) => {
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value
        }));
    };

    useEffect(()=>{
        props.createAccountData(values);
    })

    

    return(
        <Box>
          <Container fixed>
                <div style={{display: 'flex', alignItems: 'center', gap: '10%'}}>
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
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{margin:'1%'}}>Age</Typography>
                    <TextField
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('age', e.target.value)}
                    />
                    </div>
                )}
                <div style={{display: 'flex', alignItems: 'center', gap: '6%'}}>
                    <Typography sx={{margin:'1%'}}>Email Address</Typography>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('emailAddress', e.target.value)}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%'}}>
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