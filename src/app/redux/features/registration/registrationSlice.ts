'use client';

import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../store";
import database from "@/app/firestore/firestore";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import { Goals } from "./state/goals/goals";
import { UserState } from "./state/user/user";
import { MentorProfessionalDetails } from "./state/details/mentorDetails";
import { MentorPreferences } from "./state/preferences/mentorPreferences";
import EducationalBackground from "./state/background/educationalBackground";
import MenteePreferences from "./state/preferences/menteePreferences";
import { Skills } from "./state/skills/skills";
import { PersonalityType } from "./state/personality-type/personalityType";
import { Status } from "./state/dashboard/status/status";

export const createMenteeDocument = createAsyncThunk(
    'registration/createMenteeDocument',
    async () => {
        const registrationSlice = store.getState().registration
        const mainDocRef = await addDoc(collection(database, "Mentees"), {createdAt: serverTimestamp(), documentOf: registrationSlice.user.fullName, status: Status.Incomplete});

        const personalDetailsCollectionRef = collection(mainDocRef, "Personal Details");
        await addDoc(personalDetailsCollectionRef, {
            fullName: registrationSlice.user.fullName,
            age: registrationSlice.user.age ? registrationSlice.user.age : 0,
            phoneNumber: registrationSlice.user.phoneNumber,
            gender: registrationSlice.user.gender == undefined ? null : registrationSlice.user.gender,
            emailAddress: registrationSlice.user.emailAddress,
            mentor: registrationSlice.user.mentor == undefined ? null : registrationSlice.user.mentor,
            mentee: registrationSlice.user.mentee == undefined ? null : registrationSlice.user.mentee,
            currentStage: registrationSlice.user.currentStage == undefined ? null : registrationSlice.user.currentStage
        });
    
        const backgroundDetailsCollectionRef = collection(mainDocRef, "Background Details");
        await addDoc(backgroundDetailsCollectionRef, {
            programs: registrationSlice.menteeEducationalBackground.programs,
            majors: registrationSlice.menteeEducationalBackground.majors
        });
    
        const menteePreferencesCollectionRef = collection(mainDocRef, "Preferences");
        await addDoc(menteePreferencesCollectionRef, {
            preferences: registrationSlice.menteePreferences.preferences
        });
    
        const skillsCollectionRef = collection(mainDocRef, "Skills");
        await addDoc(skillsCollectionRef, {
          basicSkills: {
            firstBasicSoftSkill: registrationSlice.skills.basicSkills.firstBasicSoftSkill,
            firstBasicIndustrySkill: registrationSlice.skills.basicSkills.firstBasicIndustrySkill,
            secondBasicIndustrySkill: registrationSlice.skills.basicSkills.secondBasicIndustrySkill
          },
          expertSkills: {
            firstExpertSoftSkill: registrationSlice.skills.expertSkills.firstExpertSoftSkill,
            firstExpertIndustrySkill: registrationSlice.skills.expertSkills.firstExpertIndustrySkill,
            secondExpertIndustrySkill: registrationSlice.skills.expertSkills.secondExpertIndustrySkill
          }});
    
        const goalsCollectionRef = collection(mainDocRef, "Goals");
        await addDoc(goalsCollectionRef, {
          longTermGoal: registrationSlice.goals.longTermGoal,
          firstShortTermGoal: registrationSlice.goals.firstShortTermGoal,
          secondShortTermGoal: registrationSlice.goals.secondShortTermGoal
        })
    
        const personalityTypeCollectionRef = collection(mainDocRef, "Personality Type");
        await addDoc(personalityTypeCollectionRef, {
          personalityType: registrationSlice.personalityType.personalityType
        })
    }
)


export const createMentorDocument = createAsyncThunk(
  'registration/createMentorDocument',
  async () => {
      const registrationSlice = store.getState().registration
      const mainDocRef = await addDoc(collection(database, "Mentors"), {createdAt: serverTimestamp(), documentOf: registrationSlice.user.fullName, status: Status.Incomplete});

      const personalDetailsCollectionRef = collection(mainDocRef, "Personal Details");
      await addDoc(personalDetailsCollectionRef, {
          fullName: registrationSlice.user.fullName,
          age: registrationSlice.user.age ? registrationSlice.user.age : 0,
          phoneNumber: registrationSlice.user.phoneNumber,
          gender: registrationSlice.user.gender == undefined ? null : registrationSlice.user.gender,
          emailAddress: registrationSlice.user.emailAddress,
          mentor: registrationSlice.user.mentor == undefined ? null : registrationSlice.user.mentor,
          mentee: registrationSlice.user.mentee == undefined ? null : registrationSlice.user.mentee,
          currentStage: registrationSlice.user.currentStage == undefined ? null : registrationSlice.user.currentStage
      });
  
      const professionalDetailsCollectionRef = collection(mainDocRef, "Professional Details");
      await addDoc(professionalDetailsCollectionRef, {
          jobTitle: registrationSlice.mentorProfessionalDetailsData.jobTitle,
          organisation: registrationSlice.mentorProfessionalDetailsData.organisation,
          specialisation: registrationSlice.mentorProfessionalDetailsData.specialisation,
      });
  
      const mentorPreferencesCollectionRef = collection(mainDocRef, "Preferences");
      await addDoc(mentorPreferencesCollectionRef, {
          preferences: registrationSlice.mentorPreferences.preferences,
          specialisation: registrationSlice.mentorPreferences.specialisation,
          otherSpecialisation: registrationSlice.mentorPreferences.otherSpecialisation
      });
  
      const skillsCollectionRef = collection(mainDocRef, "Skills");
      await addDoc(skillsCollectionRef, {
        basicSkills: {
          firstBasicSoftSkill: registrationSlice.skills.basicSkills.firstBasicSoftSkill,
          firstBasicIndustrySkill: registrationSlice.skills.basicSkills.firstBasicIndustrySkill,
          secondBasicIndustrySkill: registrationSlice.skills.basicSkills.secondBasicIndustrySkill
        },
        expertSkills: {
          firstExpertSoftSkill: registrationSlice.skills.expertSkills.firstExpertSoftSkill,
          firstExpertIndustrySkill: registrationSlice.skills.expertSkills.firstExpertIndustrySkill,
          secondExpertIndustrySkill: registrationSlice.skills.expertSkills.secondExpertIndustrySkill
        }});
  
      const goalsCollectionRef = collection(mainDocRef, "Goals");
      await addDoc(goalsCollectionRef, {
        longTermGoal: registrationSlice.goals.longTermGoal,
        firstShortTermGoal: registrationSlice.goals.firstShortTermGoal,
        secondShortTermGoal: registrationSlice.goals.secondShortTermGoal
      })
  
      const personalityTypeCollectionRef = collection(mainDocRef, "Personality Type");
      await addDoc(personalityTypeCollectionRef, {
        personalityType: registrationSlice.personalityType.personalityType
      })
  }
)


export interface registrationForm {
    status: 'idle' | 'loading' | 'success' | 'error',
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
    status: 'idle',
    user: {} as UserState,
    mentorProfessionalDetailsData: {} as MentorProfessionalDetails,
    mentorPreferences: {} as MentorPreferences,
    skills:{
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
    goals: {} as Goals,
    menteeEducationalBackground: {} as EducationalBackground,
    menteePreferences: {} as MenteePreferences,
    personalityType: {} as PersonalityType,
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
            state.user.currentStage = action.payload.currentStage
        },
        mentorProfessionalDetails: (state, action: PayloadAction<MentorProfessionalDetails>) =>{
            state.mentorProfessionalDetailsData.jobTitle = action.payload.jobTitle;
            state.mentorProfessionalDetailsData.organisation= action.payload.organisation;
            state.mentorProfessionalDetailsData.specialisation = action.payload.specialisation;
        },
        mentorPreferences: (state, action: PayloadAction<MentorPreferences>)=>{
            state.mentorPreferences.preferences = action.payload.preferences;
            state.mentorPreferences.specialisation = action.payload.specialisation;
            state.mentorPreferences.otherSpecialisation = action.payload.otherSpecialisation
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
            state.menteePreferences.preferences = action.payload.preferences;
        },
        personalityType: (state, action: PayloadAction<PersonalityType>) =>{
            state.personalityType.personalityType = action.payload.personalityType
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMenteeDocument.pending, (state) => {
                state.status = 'idle'
            })
            .addCase(createMenteeDocument.fulfilled, (state) => {
                // Add user to the state array
                console.log("createMenteeDocument fulfilled");
                state.status = 'success'
            })
            .addCase(createMentorDocument.fulfilled, () => {
                // Add user to the state array
                console.log("createMentorDocument fulfilled");
            });
    }    
})



export const {createAnAccount, mentorProfessionalDetails, mentorPreferences, skills, 
    goals, menteeEducationalBackground, menteePreferences, personalityType} = registrationSlice.actions;
export default registrationSlice.reducer;