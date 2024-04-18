"use client";

import * as React from "react";
import { store } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import {
  createMenteeDocument,
  createMentorDocument,
} from "../redux/features/registration/registrationSlice";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfilePhotoComponent from "./subform/profile-photo/page";
import CreateAccount from "../form/subform/create-account/page";
import { useEffect, useState } from "react";
import { UserState } from "../redux/features/registration/state/user/user";
import { useSelector } from "react-redux";
import {
  createAnAccount,
  mentorProfessionalDetails,
  skills,
  goals,
  mentorPreferences,
  menteeEducationalBackground,
  menteePreferences,
  personalityType,
} from "../redux/features/registration/registrationSlice";
import { RootState } from "../redux/store";
import Details from "../form/subform/details/page";
import { MentorProfessionalDetails } from "../redux/features/registration/state/details/mentorDetails";
import SkillsComponent from "./subform/skills/page";
import { Skills } from "../redux/features/registration/state/skills/skills";
import GoalsComponent from "./subform/goals/page";
import { Goals } from "../redux/features/registration/state/goals/goals";
import { Container } from "@mui/material";
import { MentorPreferences } from "../redux/features/registration/state/preferences/mentorPreferences";
import Preferences from "./subform/mentor-preferences/page";
import EducationalBackgroundComponent from "./subform/background/educationalBackground";
import EducationalBackground from "../redux/features/registration/state/background/educationalBackground";
import MenteePreferencesComponent from "./subform/mentee-preferences/page";
import MenteePreferences from "../redux/features/registration/state/preferences/menteePreferences";
import PersonalityTypeComponent from "./subform/personality-type/page";
import { PersonalityType } from "../redux/features/registration/state/personality-type/personalityType";
import { personalDetailsSelector } from "../redux/selector";

const Form = () => {
  const dispatch = useAppDispatch();
  const createAccountDetailsSelector = useSelector(personalDetailsSelector);
  const mentorProfessionalDetailsSelector = useSelector(
    (state: RootState) => state.registration.mentorProfessionalDetailsData
  );
  const mentorPreferencesSelector = useSelector(
    (state: RootState) => state.registration.mentorPreferences
  );
  const skillsSelector = useSelector(
    (state: RootState) => state.registration.skills
  );
  const goalsSelector = useSelector(
    (state: RootState) => state.registration.goals
  );
  const personalityTypeSelector = useSelector(
    (state: RootState) => state.registration.personalityType
  );

  const [createAnAccountData, setCreateAccountData] = useState<UserState>(
    createAccountDetailsSelector
  );
  const [detailsData, setMentorProfessionalDetailsData] =
    useState<MentorProfessionalDetails>(mentorProfessionalDetailsSelector);
  const [mentorPreferencesData, setMentorPreferencesData] =
    useState<MentorPreferences>(mentorPreferencesSelector);
  const [skillsData, setSkillsData] = useState<Skills>(skillsSelector);
  const [goalsData, setGoalsData] = useState<Goals>(goalsSelector);
  const [personalityTypeData, setPersonalityTypeData] =
    useState<PersonalityType>(personalityTypeSelector);

  const menteePreferencesSelector = useSelector(
    (state: RootState) => state.registration.menteePreferences
  );
  const menteeEducationalBackgroundSelector = useSelector(
    (state: RootState) => state.registration.menteeEducationalBackground
  );
  const [menteeEducationalBackgroundData, setMenteeEducationalBackgroundData] =
    useState<EducationalBackground>(menteeEducationalBackgroundSelector);
  const [menteePreferencesData, setMenteePreferencesData] =
    useState<MenteePreferences>(menteePreferencesSelector);

  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    activeStep === 7
      ? createAnAccountData.mentee
        ? dispatch(createMenteeDocument())
        : dispatch(createMentorDocument())
      : console.log("none");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createAnAccount(createAnAccountData));
    }
    if (activeStep === 2) {
      if (createAccountDetailsSelector.mentee) {
        dispatch(menteeEducationalBackground(menteeEducationalBackgroundData));
      } else {
        dispatch(mentorProfessionalDetails(detailsData));
      }
    }
    if (activeStep === 3) {
      if (createAccountDetailsSelector.mentee) {
        dispatch(menteePreferences(menteePreferencesData));
      } else {
        dispatch(mentorPreferences(mentorPreferencesData));
      }
    }
    if (activeStep === 4) {
      dispatch(skills(skillsData));
    }
    if (activeStep === 5) {
      dispatch(goals(goalsData));
    }
    if (activeStep === 6) {
      dispatch(personalityType(personalityTypeData));
    }
  });

  useEffect(() => {
    console.log(activeStep, "states", store.getState());
  }, [activeStep]);

  const mentorSteps = [
    {
      label: "Upload photo",
      content: <ProfilePhotoComponent />,
    },
    {
      label: "Personal Details",
      content: (
        <CreateAccount
          createAccountData={(data: UserState) => setCreateAccountData(data)}
        />
      ),
    },
    {
      label: "Professional Details",
      content: (
        <Details
          mentorProfessionalDetailsData={(data: MentorProfessionalDetails) =>
            setMentorProfessionalDetailsData(data)
          }
        />
      ),
    },
    {
      label: "Preferences",
      content: (
        <Preferences
          mentorPreferencesData={(data: MentorPreferences) =>
            setMentorPreferencesData(data)
          }
        />
      ),
    },
    {
      label: "Skills",
      content: (
        <SkillsComponent skills={(data: Skills) => setSkillsData(data)} />
      ),
    },
    {
      label: "Goals",
      content: (
        <GoalsComponent
          goalsData={(data: Goals) => setGoalsData(data)}
        ></GoalsComponent>
      ),
    },
    {
      label: "Personality Type",
      content: (
        <PersonalityTypeComponent
          personalityType={(data: PersonalityType) =>
            setPersonalityTypeData(data)
          }
        />
      ),
    },
  ];

  const menteeSteps = [
    {
      label: "Upload photo",
      content: <ProfilePhotoComponent />,
    },
    {
      label: "Personal Details",
      content: (
        <CreateAccount
          createAccountData={(data: UserState) => setCreateAccountData(data)}
        />
      ),
    },
    {
      label: "Background",
      content:
        createAnAccountData.currentStage === "Undergraduate/Graduate" ||
        createAnAccountData.currentStage === "Postgraduate" ? (
          <EducationalBackgroundComponent
            menteeEducationalBackgroundData={(data: EducationalBackground) =>
              setMenteeEducationalBackgroundData(data)
            }
          />
        ) : (
          <Details
            mentorProfessionalDetailsData={(data: MentorProfessionalDetails) =>
              setMentorProfessionalDetailsData(data)
            }
          />
        ),
    },
    {
      label: "Preferences",
      content: (
        <MenteePreferencesComponent
          menteePreferencesData={(data: MenteePreferences) =>
            setMenteePreferencesData(data)
          }
        />
      ),
    },
    {
      label: "Skills",
      content: (
        <SkillsComponent skills={(data: Skills) => setSkillsData(data)} />
      ),
    },
    {
      label: "Goals",
      content: (
        <GoalsComponent
          goalsData={(data: Goals) => setGoalsData(data)}
        ></GoalsComponent>
      ),
    },
    {
      label: "Personality Type",
      content: (
        <PersonalityTypeComponent
          personalityType={(data: PersonalityType) =>
            setPersonalityTypeData(data)
          }
        />
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", padding: "5%", alignContent: "center" }}>
      <Container sx={{ backgroundColor: "#F4E6F2", borderRadius: "10px" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            padding: "5%",
            "& .MuiStepLabel-label": { color: "#1E1F42" },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#1E1F42",
              fontWeight: "bold",
              fontSize: "20px",
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: "#1E1F42",
              fontSize: "20px",
              fontWeight: "bold",
            },
          }}
        >
          {createAccountDetailsSelector.mentor
            ? mentorSteps.map((step, index) => (
                <Step key={`${step.label}-${index}`}>
                  <StepLabel
                    optional={index === 6 ? <span>Last step</span> : null}
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
                          sx={{ mt: 1, mr: 1, backgroundColor: "#8F3880" }}
                        >
                          {index === mentorSteps.length - 1
                            ? "Finish"
                            : "Continue"}
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
              ))
            : menteeSteps.map((step, index) => (
                <Step key={`${step.label}-${index}`}>
                  <StepLabel
                    optional={
                      index === 5 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                    style={{ color: "white" }}
                    sx={{
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "white", // circle color (ACTIVE)
                      },
                    }}
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
                          {index === mentorSteps.length - 1
                            ? "Finish"
                            : "Continue"}
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
        {activeStep === mentorSteps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Form;
