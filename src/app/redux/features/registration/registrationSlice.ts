'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Goals } from "./state/goals/goals";
import { UserState } from "./state/user/user";
import { MentorProfessionalDetails } from "./state/details/mentorDetails";
import { MentorPreferences } from "./state/preferences/mentorPreferences";
import EducationalBackground from "./state/background/educationalBackground";
import MenteePreferences from "./state/preferences/menteePreferences";
import { Skills } from "./state/skills/skills";
import { PersonalityType } from "./state/personality-type/personalityType";

export interface registrationForm {
    user: UserState,
    mentorProfessionalDetailsData: MentorProfessionalDetails,
    mentorPreferences: MentorPreferences,
    skills: Skills,
    goals: Goals,
    menteeEducationalBackground: EducationalBackground,
    menteePreferences: MenteePreferences,
    personalityType: PersonalityType
}

const initialState: registrationForm = {
    user:{
        fullName: "",
        age: 0,
        phoneNumber: '',
        gender: '',
        emailAddress: '',
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
    skills: {
        basicSkills:{
            firstBasicSoftSkill: '',
            firstBasicIndustrySkill: '',
            secondBasicIndustrySkill: ''
        },
        expertSkills:{
            firstExpertSoftSkill: '',
            firstExpertIndustrySkill: '',
            secondExpertIndustrySkill: ''
        },
    },
    goals:{
        longTermGoal: '',
        firstShortTermGoal: '',
        secondShortTermGoal: ''
    },
    menteeEducationalBackground:{
        programs: [],
        majors: []
    },
    menteePreferences: {
        female: false,
        male: false,
        any: false
    },
    personalityType:{
        personalityType: ''
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
        skills: (state, action: PayloadAction<Skills>)=>{ 
            state.skills.basicSkills.firstBasicSoftSkill= action.payload.basicSkills.firstBasicSoftSkill;
            state.skills.basicSkills.firstBasicIndustrySkill= action.payload.basicSkills.firstBasicIndustrySkill;
            state.skills.basicSkills.secondBasicIndustrySkill = action.payload.basicSkills.secondBasicIndustrySkill;
            state.skills.expertSkills.firstExpertSoftSkill = action.payload.expertSkills.firstExpertSoftSkill;
            state.skills.expertSkills.firstExpertIndustrySkill = action.payload.expertSkills.firstExpertIndustrySkill;
            state.skills.expertSkills.secondExpertIndustrySkill = action.payload.expertSkills.secondExpertIndustrySkill;
        },
        goals: (state, action: PayloadAction<Goals>)=>{
            state.goals.longTermGoal= action.payload.longTermGoal;
            state.goals.firstShortTermGoal= action.payload.firstShortTermGoal;
            state.goals.secondShortTermGoal= action.payload.secondShortTermGoal;
        },
        menteeEducationalBackground:  (state, action: PayloadAction<EducationalBackground>)=>{
            state.menteeEducationalBackground.programs = action.payload.programs;
            state.menteeEducationalBackground.majors = action.payload.majors
        },
        menteePreferences: (state, action: PayloadAction<MenteePreferences>) =>{
            state.menteePreferences.female = action.payload.female;
            state.menteePreferences.male = action.payload.male;
            state.menteePreferences.any = action.payload.any
        },
        personalityType: (state, action: PayloadAction<PersonalityType>) =>{
            state.personalityType.personalityType = action.payload.personalityType
        }
    }
})

export const {createAnAccount, mentorProfessionalDetails, mentorPreferences, skills, goals, menteeEducationalBackground, menteePreferences, personalityType} = registrationSlice.actions;
export default registrationSlice.reducer;