'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MentorPreferredGoals } from "./state/goals/mentorPreferredGoals";
import { UserState } from "./state/user/user";
import { MentorDetails } from "./state/details/mentorDetails";
import { MentorSkills } from "./state/skills/mentorSkills";

interface mentorRegistrationForm {
    user: UserState,
    mentorDetails: MentorDetails,
    mentorSkills: MentorSkills,
    mentorPreferredGoals: MentorPreferredGoals
}


const initialState: mentorRegistrationForm = {
    user:{
        mentor:'',
        mentee:''
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
        createAnAccount: (state, action: PayloadAction<string>) => {
            state.user.mentor = action.payload === 'mentor' ? 'mentor' : '';
            state.user.mentee = action.payload === 'mentee' ? 'mentee' : '';
        },
        mentorDetails: (state, action: PayloadAction<string[]>) =>{
            state.mentorDetails.fullName = action.payload[0];
            state.mentorDetails.degree = action.payload[1];
            state.mentorDetails.organisation = action.payload[2];
            state.mentorDetails.industry = action.payload[3];
            state.mentorDetails.specialisation = action.payload[4];
        },
        mentorBasicSkills: (state, action: PayloadAction<string[]>)=>{
            state.mentorSkills.firstBasicSkill= action.payload[0];
            state.mentorSkills.secondBasicSkill= action.payload[1];
            state.mentorSkills.thirdBasicSkill= action.payload[2];
        },
        mentorExpertSkills: (state, action: PayloadAction<string[]>)=>{
            state.mentorSkills.firstExpertSkill= action.payload[0];
            state.mentorSkills.secondExpertSkill= action.payload[1];
            state.mentorSkills.thirdExpertSkill= action.payload[2];
        },
        mentorPreferredGoals: (state, action: PayloadAction<string[]>)=>{
            state.mentorPreferredGoals.longTermGoal= action.payload[0];
            state.mentorPreferredGoals.firstShortTermGoal= action.payload[1];
            state.mentorPreferredGoals.secondShortTermGoal= action.payload[2];
        }
          
    }
})

export const {createAnAccount, mentorDetails, mentorBasicSkills, mentorExpertSkills, mentorPreferredGoals} = registrationSlice.actions;
export default registrationSlice.reducer;