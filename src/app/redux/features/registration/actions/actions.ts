import database from "@/app/firestore/firestore";
import { store } from "../../../store"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { Status } from "../state/dashboard/status/status";
import { HomeTableData } from "../state/dashboard/home-table-data";

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
      const newRows: HomeTableData[] = [];
      const q = query(collection(database, "Mentees"), where("documentOf", "!=", null));
      const r = query(collection(database, "Mentors"), where("documentOf", "!=", null));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Construct new data object
        const newData: HomeTableData = {
          id: doc.data()['documentOf'] ,
          avatar: 'G',
          fullName: doc.data()['documentOf'],
          registeredOn: doc.data()['createdAt'].toDate().toISOString(),
          status: doc.data()['status'],
          assignedMentor: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentor' : doc.data()['assignedMentor'],
          participatingAs: 'Mentee', 
          action: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentor' : doc.data()['assignedMentor']
        };
        newRows.push(newData);
      });
  
      const querySnapshotMentor = await getDocs(r);
      querySnapshotMentor.forEach((doc) => {
        // Construct new data object
        const newData: HomeTableData = {
          id: doc.data()['documentOf'],
          avatar: 'G',
          fullName: doc.data()['documentOf'],
          registeredOn: doc.data()['createdAt'].toDate().toISOString(),
          status: doc.data()['status'],
          assignedMentor: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentee' : 'Mentor Name',
          participatingAs: 'Mentor', 
          action: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentee' : 'Mentor Name'
        };
        newRows.push(newData);
        
      });
      return newRows;
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

export const updateDocStatus = createAsyncThunk(
  'registration/createMentorDocument',
  async (data) => {
    const name = data;
    const q = query(collection(database, "Mentees"), where("documentOf", "==", name));
    const querySnapshot = await getDocs(q);
    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, 'Mentees', docSnapshot.id); // Get the document reference
        await updateDoc(docRef, { 
          status: Status.Completed,
          assignedMentor: 'Mentor name' }); // Update the document
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    });
  }
)

