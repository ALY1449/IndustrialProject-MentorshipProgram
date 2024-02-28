'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MentorPreferredGoals } from "./state/goals/mentorPreferredGoals";
import { UserState } from "./state/user/user";
import { MentorDetails } from "./state/details/mentorDetails";
import { MentorSkills } from "./state/skills/mentorSkills";

export interface mentorRegistrationForm {
    user: UserState,
    mentorDetails: MentorDetails,
    mentorSkills: MentorSkills,
    mentorPreferredGoals: MentorPreferredGoals
}

export interface CreateAccountPayload {
    users: UserState[];
  }

const initialState: mentorRegistrationForm = {
    user:{
        fullName: "",
        age: "",
        emailAddress: '',
        password: '',
        mentor: undefined,
        mentee: undefined,
    },
    mentorDetails:{
        fullName: '',
        degree: '',
        organisation: '',
        industry: '',
        specialisation: ''
    },
    mentorSkills:{
        firstBasicSkill: '',
        secondBasicSkill: '',
        thirdBasicSkill: '',
        firstExpertSkill: '',
        secondExpertSkill: '',
        thirdExpertSkill: ''
    },
    mentorPreferredGoals:{
        longTermGoal: '',
        firstShortTermGoal: '',
        secondShortTermGoal: ''
    }
};


export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers:{
        createAnAccount: (state, action: PayloadAction<UserState>) => {
            state.user.fullName= action.payload.fullName;
            state.user.age = action.payload.age;
            state.user.emailAddress = action.payload.emailAddress;
            state.user.password = action.payload.password;
            state.user.mentor = action.payload.mentor;
            state.user.mentee = action.payload.mentee;
            state.user.undergrad_or_grad = action.payload.undergrad_or_grad;
            state.user.postgrad = action.payload.postgrad;
            state.user.professional = action.payload.professional
        },
        mentorDetails: (state, action: PayloadAction<MentorDetails>) =>{
            state.mentorDetails.fullName = action.payload.fullName;
            state.mentorDetails.degree = action.payload.degree;
            state.mentorDetails.organisation = action.payload.organisation;
            state.mentorDetails.industry = action.payload.industry;
            state.mentorDetails.specialisation = action.payload.specialisation;
        },
        mentorSkills: (state, action: PayloadAction<MentorSkills>)=>{
            state.mentorSkills.firstBasicSkill= action.payload.firstBasicSkill;
            state.mentorSkills.secondBasicSkill= action.payload.secondBasicSkill;
            state.mentorSkills.thirdBasicSkill= action.payload.thirdBasicSkill;
            state.mentorSkills.firstExpertSkill= action.payload.firstExpertSkill;
            state.mentorSkills.secondExpertSkill= action.payload.secondExpertSkill;
            state.mentorSkills.thirdExpertSkill= action.payload.thirdExpertSkill;
        },
        mentorPreferredGoals: (state, action: PayloadAction<MentorPreferredGoals>)=>{
            state.mentorPreferredGoals.longTermGoal= action.payload.longTermGoal;
            state.mentorPreferredGoals.firstShortTermGoal= action.payload.firstShortTermGoal;
            state.mentorPreferredGoals.secondShortTermGoal= action.payload.secondShortTermGoal;
        }
          
    }
})

export const {createAnAccount, mentorDetails, mentorSkills, mentorPreferredGoals} = registrationSlice.actions;
export default registrationSlice.reducer;