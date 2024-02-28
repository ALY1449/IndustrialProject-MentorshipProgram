'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CreateAccount from './subform/create-account';
import { useEffect, useState } from 'react';
import { UserState } from '../redux/features/registration/state/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { createAnAccount, mentorDetails, mentorSkills, mentorPreferredGoals } from '../redux/features/registration/registrationSlice';
import { RootState } from '../redux/store';
import Details from './subform/details';
import { MentorDetails } from '../redux/features/registration/state/details/mentorDetails';
import BasicSkills from './subform/skills';
import { MentorSkills } from '../redux/features/registration/state/skills/mentorSkills';
import Goals from './subform/goals';
import { MentorPreferredGoals } from '../redux/features/registration/state/goals/mentorPreferredGoals';
import MenteeDetails from './subform/menteeDetails';


const Form = () => {
  const dispatch = useDispatch();
  const createAccountDetailsSelector = useSelector((state: RootState)=> state.registration.user);
  const mentorDetailsSelector = useSelector((state: RootState)=> state.registration.mentorDetails);
  const mentorBasicSkillsSelector = useSelector((state: RootState)=> state.registration.mentorSkills);
  const mentorGoalsDataSelector = useSelector((state:RootState)=> state.registration.mentorPreferredGoals);
  const [createAnAccountData, setCreateAccountData]= useState<UserState>(createAccountDetailsSelector);
  const [detailsData, setDetailsData]= useState<MentorDetails>(mentorDetailsSelector);
  const [mentorSkillsData, setMentorSkillsData] = useState<MentorSkills>(mentorBasicSkillsSelector);
  const [mentorGoalsData, setMentorGoalsData] = useState<MentorPreferredGoals>(mentorGoalsDataSelector);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  useEffect(()=>{
    if(activeStep===1){
      dispatch(createAnAccount(createAnAccountData));
    }
    if(activeStep===2){
      dispatch(mentorDetails(detailsData));
    }
    if(activeStep===3){
      dispatch(mentorSkills(mentorSkillsData));
    }
    if(activeStep===4){
      dispatch(mentorPreferredGoals(mentorGoalsData));
    }
    
  })


  useEffect(()=>{
    console.log(activeStep, "current data", createAccountDetailsSelector)
  }, [activeStep, createAccountDetailsSelector])


  const steps = [
    {
      label: 'Create an Account',
      content: <CreateAccount createAccountData={(data: UserState) => setCreateAccountData(data)}/>
    },
    {
      label: 'Details',
      content: createAccountDetailsSelector.mentor == true ? <Details mentorDetails={(data: MentorDetails) => setDetailsData(data)}/> :  <MenteeDetails/> 
    },
    {
      label: 'Skills',
      content: <BasicSkills mentorSkills={(data: MentorSkills) => setMentorSkillsData(data)}/>
    },
    {
      label: 'Goals',
      content: <Goals mentorGoals={(data: MentorPreferredGoals)=> setMentorGoalsData(data)}></Goals>
    },
  ];


  return (
    <Box sx={{ maxWidth: 800}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <div>{step.content}</div>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Form;