import database from "@/app/firestore/firestore";
import { store } from "../../../store"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { Status } from "../state/dashboard/status/status";

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

export const fetchMenteeCollection = createAsyncThunk(
    'dashboard/fetchMenteeCollection',
    async () => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(q);
            const newRows = [];
            querySnapshot.forEach((doc, index) => {
              // Construct new data object
              const newData = {
                id: doc.data()['documentOf'] + '_' + index,
                avatar: 'G',
                fullName: doc.data()['documentOf'],
                registeredOn: doc.data()['createdAt'].toDate(),
                status: doc.data()['status'],
                assignedMentor: doc.data()['assignedMentor'], 
                participatingAs: 'Mentee', 
                actions: doc.data()['status'] == 'INCOMPLETE' ? 'Assign a mentor' : undefined
              };
              newRows.push(newData);
            });
            // Update the state with the new rows
            setRows(newRows);
        }
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