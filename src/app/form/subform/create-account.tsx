'use client';

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, TextField, Container, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Radio, RadioGroup, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { UserState } from "@/app/redux/features/registration/state/user/user";
import './style.css'
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const CreateAccount: React.FC<ChildProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [values, setValues] = useState<UserState>({
        fullName: '',
        age: '',
        emailAddress: '',
        password: '',
        mentor: undefined,
        mentee: undefined,
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

    //initial render
    useEffect(()=>{
        props.createAccountData(values);
    })

    

    return(
        <Box>
          <Container fixed>
                <Typography sx={{margin:'1%'}}>Full Name</Typography>
                    <TextField
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                />
                <Typography sx={{margin:'1%'}}>Age</Typography>
                    <TextField
                        sx={{ m: 1, width: '35ch' }}
                        onChange={(e) => handleChange('age', e.target.value)}
                />
                <Typography sx={{margin:'1%'}}>Email Address</Typography>
                <TextField
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '35ch' }}
                    onChange={(e) => handleChange('emailAddress', e.target.value)}
                />
                <Typography sx={{margin:'1%'}} >Password</Typography>
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
                />
                <Typography sx={{margin:'1%'}}>Joining as a </Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{margin:'1%'}}
                >
                    <FormControlLabel value="mentor" control={<Radio onChange={() => handleChange('mentor', true)}/>} label="Mentor" />
                    <FormControlLabel value="mentee" control={<Radio onChange={() => handleChange('mentee', true)}/>} label="Mentee" />
                </RadioGroup>
          </Container>
        </Box>  
    )
}

export default CreateAccount;