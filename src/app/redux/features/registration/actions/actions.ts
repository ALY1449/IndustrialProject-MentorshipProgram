import database from "../../../../../../firestore/firestore";
import { store } from "../../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Status } from "../state/dashboard/status/status";
import { HomeTableData } from "../state/dashboard/home-table-data";
import { MatchRow } from "@/app/dashboard/results/page";

export const createMenteeDocument = createAsyncThunk(
  "registration/createMenteeDocument",
  async () => {
    const registrationSlice = store.getState().registration;
    const mainDocRef = await addDoc(collection(database, "Mentees"), {
      createdAt: serverTimestamp(),
      documentOf: registrationSlice.user.fullName,
      status: Status.Incomplete,
    });

    const personalDetailsCollectionRef = collection(
      mainDocRef,
      "Personal Details"
    );
    await addDoc(personalDetailsCollectionRef, {
      fullName: registrationSlice.user.fullName,
      age: registrationSlice.user.age ? registrationSlice.user.age : 0,
      phoneNumber: registrationSlice.user.phoneNumber,
      gender:
        registrationSlice.user.gender == undefined
          ? null
          : registrationSlice.user.gender,
      emailAddress: registrationSlice.user.emailAddress,
      mentor:
        registrationSlice.user.mentor == undefined
          ? null
          : registrationSlice.user.mentor,
      mentee:
        registrationSlice.user.mentee == undefined
          ? null
          : registrationSlice.user.mentee,
      currentStage:
        registrationSlice.user.currentStage == undefined
          ? null
          : registrationSlice.user.currentStage,
    });

    const backgroundDetailsCollectionRef = collection(
      mainDocRef,
      "Background Details"
    );
    await addDoc(backgroundDetailsCollectionRef, {
      programs: registrationSlice.menteeEducationalBackground.programs,
      majors: registrationSlice.menteeEducationalBackground.majors,
    });

    const menteePreferencesCollectionRef = collection(
      mainDocRef,
      "Preferences"
    );
    await addDoc(menteePreferencesCollectionRef, {
      preferences: registrationSlice.menteePreferences.preferences,
    });

    const skillsCollectionRef = collection(mainDocRef, "Skills");
    await addDoc(skillsCollectionRef, {
      basicSkills: {
        firstBasicSoftSkill:
          registrationSlice.skills.basicSkills.firstBasicSoftSkill,
        firstBasicIndustrySkill:
          registrationSlice.skills.basicSkills.firstBasicIndustrySkill,
        secondBasicIndustrySkill:
          registrationSlice.skills.basicSkills.secondBasicIndustrySkill,
      },
      expertSkills: {
        firstExpertSoftSkill:
          registrationSlice.skills.expertSkills.firstExpertSoftSkill,
        firstExpertIndustrySkill:
          registrationSlice.skills.expertSkills.firstExpertIndustrySkill,
        secondExpertIndustrySkill:
          registrationSlice.skills.expertSkills.secondExpertIndustrySkill,
      },
    });

    const goalsCollectionRef = collection(mainDocRef, "Goals");
    await addDoc(goalsCollectionRef, {
      longTermGoal: registrationSlice.goals.longTermGoal,
      firstShortTermGoal: registrationSlice.goals.firstShortTermGoal,
      secondShortTermGoal: registrationSlice.goals.secondShortTermGoal,
    });

    const personalityTypeCollectionRef = collection(
      mainDocRef,
      "Personality Type"
    );
    await addDoc(personalityTypeCollectionRef, {
      personalityType: registrationSlice.personalityType.personalityType,
    });
  }
);

export const fetchMenteeCollection = createAsyncThunk(
  "dashboard/fetchMenteeCollection",
  async () => {
    const newRows: HomeTableData[] = [];
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );
    const r = query(
      collection(database, "Mentors"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Construct new data object
      const newData: HomeTableData = {
        id: doc.data()["documentOf"],
        avatar: "G",
        fullName: doc.data()["documentOf"],
        registeredOn: doc.data()["createdAt"].toDate().toISOString(),
        status: doc.data()["status"],
        assignedMentor:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentor"
            : doc.data()["status"] === Status.InProgress
            ? "In progress"
            : doc.data()["assignedMentor"],
        participatingAs: "Mentee",
        action:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentor"
            : doc.data()["assignedMentor"],
      };
      newRows.push(newData);
    });

    const querySnapshotMentor = await getDocs(r);
    querySnapshotMentor.forEach((doc) => {
      // Construct new data object
      const newData: HomeTableData = {
        id: doc.data()["documentOf"],
        avatar: "G",
        fullName: doc.data()["documentOf"],
        registeredOn: doc.data()["createdAt"].toDate().toISOString(),
        status: doc.data()["status"],
        assignedMentor:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentee"
            : doc.data()["status"] === Status.InProgress
            ? "In progress"
            : doc.data()["assignedMentor"],
        participatingAs: "Mentor",
        action:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentee"
            : doc.data()["assignedMentor"],
      };
      newRows.push(newData);
    });
    return newRows;
  }
);

export const createMentorDocument = createAsyncThunk(
  "registration/createMentorDocument",
  async () => {
    const registrationSlice = store.getState().registration;
    const mainDocRef = await addDoc(collection(database, "Mentors"), {
      createdAt: serverTimestamp(),
      documentOf: registrationSlice.user.fullName,
      status: Status.Incomplete,
    });

    const personalDetailsCollectionRef = collection(
      mainDocRef,
      "Personal Details"
    );
    await addDoc(personalDetailsCollectionRef, {
      fullName: registrationSlice.user.fullName,
      age: registrationSlice.user.age ? registrationSlice.user.age : 0,
      phoneNumber: registrationSlice.user.phoneNumber,
      gender:
        registrationSlice.user.gender == undefined
          ? null
          : registrationSlice.user.gender,
      emailAddress: registrationSlice.user.emailAddress,
      mentor:
        registrationSlice.user.mentor == undefined
          ? null
          : registrationSlice.user.mentor,
      mentee:
        registrationSlice.user.mentee == undefined
          ? null
          : registrationSlice.user.mentee,
      currentStage:
        registrationSlice.user.currentStage == undefined
          ? null
          : registrationSlice.user.currentStage,
    });

    const professionalDetailsCollectionRef = collection(
      mainDocRef,
      "Professional Details"
    );
    await addDoc(professionalDetailsCollectionRef, {
      jobTitle: registrationSlice.mentorProfessionalDetailsData.jobTitle,
      organisation:
        registrationSlice.mentorProfessionalDetailsData.organisation,
      specialisation:
        registrationSlice.mentorProfessionalDetailsData.specialisation,
    });

    const mentorPreferencesCollectionRef = collection(
      mainDocRef,
      "Preferences"
    );
    await addDoc(mentorPreferencesCollectionRef, {
      preferences: registrationSlice.mentorPreferences.preferences,
      specialisation: registrationSlice.mentorPreferences.specialisation,
      otherSpecialisation:
        registrationSlice.mentorPreferences.otherSpecialisation,
    });

    const skillsCollectionRef = collection(mainDocRef, "Skills");
    await addDoc(skillsCollectionRef, {
      basicSkills: {
        firstBasicSoftSkill:
          registrationSlice.skills.basicSkills.firstBasicSoftSkill,
        firstBasicIndustrySkill:
          registrationSlice.skills.basicSkills.firstBasicIndustrySkill,
        secondBasicIndustrySkill:
          registrationSlice.skills.basicSkills.secondBasicIndustrySkill,
      },
      expertSkills: {
        firstExpertSoftSkill:
          registrationSlice.skills.expertSkills.firstExpertSoftSkill,
        firstExpertIndustrySkill:
          registrationSlice.skills.expertSkills.firstExpertIndustrySkill,
        secondExpertIndustrySkill:
          registrationSlice.skills.expertSkills.secondExpertIndustrySkill,
      },
    });

    const goalsCollectionRef = collection(mainDocRef, "Goals");
    await addDoc(goalsCollectionRef, {
      longTermGoal: registrationSlice.goals.longTermGoal,
      firstShortTermGoal: registrationSlice.goals.firstShortTermGoal,
      secondShortTermGoal: registrationSlice.goals.secondShortTermGoal,
    });

    const personalityTypeCollectionRef = collection(
      mainDocRef,
      "Personality Type"
    );
    await addDoc(personalityTypeCollectionRef, {
      personalityType: registrationSlice.personalityType.personalityType,
    });
  }
);

export const updateDocStatus = createAsyncThunk(
  "registration/updateDocStatus",
  async (data: MatchRow) => {
    const collectionName =
      data.participatingAs == "Mentee" ? "Mentees" : "Mentors";
    const q = query(
      collection(database, collectionName),
      where("documentOf", "==", data.name)
    );
    const querySnapshot = await getDocs(q);

    // Array to hold all documents including the updated one
    const updatedDocuments: HomeTableData[] = [];

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, collectionName, docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.Completed,
          assignedMentor: "Mentor name",
        }); // Update the document

        // Fetch the updated document
        const updatedDocSnapshot = await getDoc(docRef);

        if (updatedDocSnapshot.exists()) {
          // Check if the document exists
          // Add the updated document to the array
          updatedDocuments.push(updatedDocSnapshot.data() as HomeTableData);
        } else {
          console.error("Document does not exist or data is undefined");
        }

        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });

    return updatedDocuments; // Return all documents including the updated one
  }
);

export const updateDocInProgressStatus = createAsyncThunk(
  "registration/updateDocInProgressStatus",
  async (data: HomeTableData) => {
    const collectionName =
      data.participatingAs == "Mentee" ? "Mentees" : "Mentors";
    const q = query(
      collection(database, collectionName),
      where("documentOf", "==", data.fullName)
    );
    const querySnapshot = await getDocs(q);

    // Array to hold all documents including the updated one
    const updatedDocuments: HomeTableData[] = [];

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, collectionName, docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.InProgress,
        }); // Update the document

        // Fetch the updated document
        const updatedDocSnapshot = await getDoc(docRef);

        if (updatedDocSnapshot.exists()) {
          // Check if the document exists
          // Add the updated document to the array
          updatedDocuments.push(updatedDocSnapshot.data() as HomeTableData);
        } else {
          console.error("Document does not exist or data is undefined");
        }

        console.log("Document updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });

    return updatedDocuments; // Return all documents including the updated one
  }
);

export const onChanges = createAsyncThunk(
  "registration/onChanges",
  async () => {
    const newRows: HomeTableData[] = [];
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );
    const unsubscribe = onSnapshot(collection(database, "cities"), async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Construct new data object
        const newData: HomeTableData = {
          id: doc.data()["documentOf"],
          avatar: "G",
          fullName: doc.data()["documentOf"],
          registeredOn: doc.data()["createdAt"].toDate().toISOString(),
          status: doc.data()["status"],
          assignedMentor:
            doc.data()["status"] === "INCOMPLETE"
              ? "Assign a mentor"
              : doc.data()["assignedMentor"],
          participatingAs: "Mentee",
          action:
            doc.data()["status"] === "INCOMPLETE"
              ? "Assign a mentor"
              : doc.data()["assignedMentor"],
        };
        newRows.push(newData);
      });
      console.log("reading");
    });
    return newRows;
  }
);

export const getTotalMentors = createAsyncThunk(
  "dashboard/getTotalMentors",
  async () => {
    let totalMentors = 0;
    const q = query(
      collection(database, "Mentors"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      totalMentors += 1;
    });
    return totalMentors;
  }
);

export const getTotalMentees = createAsyncThunk(
  "dashboard/getTotalMentees",
  async () => {
    let totalMentees = 0;
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      totalMentees += 1;
    });
    return totalMentees;
  }
);

export const getNoMentors = createAsyncThunk(
  "dashboard/getNoMentors",
  async () => {
    let total = 0;
    const q = query(
      collection(database, "Mentees"),
      where("status", "!=", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      total += 1;
    });
    return total;
  }
);

export const getNoMentees = createAsyncThunk(
  "dashboard/getNoMentees",
  async () => {
    let total = 0;
    const q = query(
      collection(database, "Mentors"),
      where("status", "!=", Status.Completed)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(() => {
      total += 1;
    });
    return total;
  }
);
