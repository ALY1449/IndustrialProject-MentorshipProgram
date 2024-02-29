'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MentorPreferredGoals } from "./state/goals/mentorPreferredGoals";
import { UserState } from "./state/user/user";
import { MentorProfessionalDetails } from "./state/details/mentorDetails";
import { MentorSkills } from "./state/skills/mentorSkills";
import { MentorPreferences } from "./state/preferences/menteePreferences";

export interface mentorRegistrationForm {
    user: UserState,
    mentorProfessionalDetailsData: MentorProfessionalDetails,
    mentorPreferences: MentorPreferences,
    mentorSkills: MentorSkills,
    mentorPreferredGoals: MentorPreferredGoals
}

const initialState: mentorRegistrationForm = {
    user:{
        fullName: "",
        age: "",
        phoneNumber: '',
        gender: '',
        emailAddress: '',
        password: '',
        mentor: undefined,
        mentee: undefined,
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
    },
    mentorProfessionalDetailsData:{
        jobTitle: '',
        industry: [],
        specialisation: ''
    },
    mentorPreferences:{
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
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
            state.user.phoneNumber = action.payload.phoneNumber
            state.user.gender = action.payload.gender;
            state.user.emailAddress = action.payload.emailAddress;
            state.user.password = action.payload.password;
            state.user.mentor = action.payload.mentor;
            state.user.mentee = action.payload.mentee;
            state.user.undergrad_or_grad = action.payload.undergrad_or_grad;
            state.user.postgrad = action.payload.postgrad;
            state.user.professional = action.payload.professional
        },
        mentorProfessionalDetails: (state, action: PayloadAction<MentorProfessionalDetails>) =>{
            state.mentorProfessionalDetailsData.jobTitle = action.payload.jobTitle;
            state.mentorProfessionalDetailsData.industry= action.payload.industry;
            state.mentorProfessionalDetailsData.specialisation = action.payload.specialisation;
        },
        mentorPreferences: (state, action: PayloadAction<MentorPreferences>)=>{
            state.mentorPreferences.undergrad_or_grad = action.payload.undergrad_or_grad;
            state.mentorPreferences.postgrad = action.payload.postgrad;
            state.mentorPreferences.professional = action.payload.professional;
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

export const {createAnAccount, mentorProfessionalDetails, mentorPreferences, mentorSkills, mentorPreferredGoals} = registrationSlice.actions;
export default registrationSlice.reducer;