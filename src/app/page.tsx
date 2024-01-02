'use client';

import { Box, Button, Container, TextField } from '@mui/material'
import { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { createAnAccount,mentorDetails,mentorBasicSkills, mentorExpertSkills, mentorPreferredGoals} from './redux/features/registration/registrationSlice';
import { useState } from 'react';

export default function Home() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [degree, setDegree] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [industry, setIndustry] = useState('');
  const [specialisation, setSpecialisation] = useState('');

  const [firstBasicSkill, setFirstBasicSkill] = useState('');
  const [secondBasicSkill, setsecondBasicSkill] = useState('');
  const [thirdBasicSkill, setThirdBasicSkill] = useState('');

  const [firstExpertSkill, setFirstExpertSkill] = useState('');
  const [secondExpertSkill, setSecondExpertSkill] = useState('');
  const [thirdExpertSkill, setThirdExpertSkill] = useState('');

  const [longTermGoal, setLongTermGoal] = useState('');
  const [firstShortTermGoal, setFirstShortTermGoal] = useState('');
  const [secondShortTermGoal, setSecondShortTermGoal] = useState('');


  return (
    <Box>
          <Container fixed>
            <div className="App">
              <div>
                <Button variant="contained" onClick={()=> dispatch(createAnAccount('mentor'))}>Become a Mentor</Button>
                <Button variant="contained" onClick={()=> dispatch(createAnAccount('mentee'))}>Become a Mentee</Button>
              </div>
              <div>
                <TextField id="outlined-basic" label="Full Name" variant="outlined" onChange={(e)=> setFullName(e.target.value)}/>
                <TextField label="Degree" variant="outlined" onChange={(e)=> setDegree(e.target.value)}/>
                <TextField label="Organisation" variant="outlined" onChange={(e)=> setOrganisation(e.target.value)}/>
                <TextField label="Industry" variant="outlined" onChange={(e)=> setIndustry(e.target.value)}/>
                <TextField label="Specialisation" variant="outlined" onChange={(e)=> setSpecialisation(e.target.value)}/>
                <Button variant="contained" onClick={()=> dispatch(mentorDetails([fullName,degree,organisation,industry,specialisation]))}>Continue</Button>
              </div>
              <div>
                <TextField label="First Basic Skill" variant="outlined" onChange={(e)=> setFirstBasicSkill(e.target.value)}/>
                <TextField label="Second Basic Skill" variant="outlined" onChange={(e)=> setsecondBasicSkill(e.target.value)}/>
                <TextField label="Third Basic Skill" variant="outlined" onChange={(e)=> setThirdBasicSkill(e.target.value)}/>
                <Button variant="contained" onClick={()=> dispatch(mentorBasicSkills([firstBasicSkill,secondBasicSkill,thirdBasicSkill]))}>Continue</Button>
              </div>
              <div>
                <TextField label="First Expert Skill" variant="outlined" onChange={(e)=> setFirstExpertSkill(e.target.value)}/>
                <TextField label="Second Expert Skill" variant="outlined" onChange={(e)=> setSecondExpertSkill(e.target.value)}/>
                <TextField label="Third Expert Skill" variant="outlined" onChange={(e)=> setThirdExpertSkill(e.target.value)}/>
                <Button variant="contained" onClick={()=> dispatch(mentorExpertSkills([firstExpertSkill,secondExpertSkill,thirdExpertSkill]))}>Continue</Button>
              </div>
              <div>
                <TextField label="First Expert Skill" variant="outlined" onChange={(e)=> setFirstExpertSkill(e.target.value)}/>
                <TextField label="Second Expert Skill" variant="outlined" onChange={(e)=> setSecondExpertSkill(e.target.value)}/>
                <TextField label="Third Expert Skill" variant="outlined" onChange={(e)=> setThirdExpertSkill(e.target.value)}/>
                <Button variant="contained" onClick={()=> dispatch(mentorExpertSkills([firstExpertSkill,secondExpertSkill,thirdExpertSkill]))}>Continue</Button>
              </div>
              <div>
                <TextField label="Long Term Goal" variant="outlined" onChange={(e)=> setLongTermGoal(e.target.value)}/>
                <TextField label="First Short Term Goal" variant="outlined" onChange={(e)=> setFirstShortTermGoal(e.target.value)}/>
                <TextField label="Second Short Term Goal" variant="outlined" onChange={(e)=> setSecondShortTermGoal(e.target.value)}/>
                <Button variant="contained" onClick={()=> dispatch(mentorPreferredGoals([longTermGoal,firstShortTermGoal,secondShortTermGoal]))}>Continue</Button>
              </div>
            </div>
          </Container>
    </Box>
  )
}
