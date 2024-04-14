'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import database from "@/app/firestore/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, updateDoc, where, getDoc} from "firebase/firestore";
import { Status } from "./state/dashboard/status/status";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { MatchRow } from "@/app/dashboard/results/page";


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
          assignedMentor: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentor' :  
          (doc.data()['status'] === Status.InProgress) ? 'In progress' : doc.data()['assignedMentor'],
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
          assignedMentor: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentee' : 
          (doc.data()['status'] === Status.InProgress) ? 'In progress' : doc.data()['assignedMentor'],
          participatingAs: 'Mentor', 
          action: doc.data()['status'] === 'INCOMPLETE' ? 'Assign a mentee' : doc.data()['assignedMentor']
        };
        newRows.push(newData);
        
      });
      return newRows;
    }
)

export const updateDocStatus = createAsyncThunk(
  'registration/updateDocStatus',
  async (data: MatchRow) => {
    const collectionName = data.participatingAs == 'Mentee' ? 'Mentees' : 'Mentors';
    const q = query(collection(database, collectionName), where("documentOf", "==", data.name));
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
          assignedMentor: 'Mentor name' }); // Update the document
        
        // Fetch the updated document
        const updatedDocSnapshot = await getDoc(docRef);

        if (updatedDocSnapshot.exists()) { // Check if the document exists
          // Add the updated document to the array
          updatedDocuments.push(updatedDocSnapshot.data() as HomeTableData);
        } else {
          console.error('Document does not exist or data is undefined');
        }
        
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    });
    
    return updatedDocuments; // Return all documents including the updated one
  }
);

export const updateDocInProgressStatus = createAsyncThunk(
  'registration/updateDocInProgressStatus',
  async (data: HomeTableData) => {
    const collectionName = data.participatingAs == 'Mentee' ? 'Mentees' : 'Mentors';
    const q = query(collection(database, collectionName), where("documentOf", "==", data.fullName));
    const querySnapshot = await getDocs(q);
    
    // Array to hold all documents including the updated one
    const updatedDocuments: HomeTableData[] = [];
    
    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, collectionName, docSnapshot.id); // Get the document reference
        await updateDoc(docRef, { 
          status: Status.InProgress }); // Update the document
        
        // Fetch the updated document
        const updatedDocSnapshot = await getDoc(docRef);

        if (updatedDocSnapshot.exists()) { // Check if the document exists
          // Add the updated document to the array
          updatedDocuments.push(updatedDocSnapshot.data() as HomeTableData);
        } else {
          console.error('Document does not exist or data is undefined');
        }
        
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    });
    
    return updatedDocuments; // Return all documents including the updated one
  }
);

export const getTotalMentors = createAsyncThunk('dashboard/getTotalMentors',
  async() =>{
      let totalMentors = 0;
      const q = query(collection(database, "Mentors"), where("documentOf", "!=", null));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        totalMentors+=1;
      });
      return totalMentors

  }
)

export const getTotalMentees = createAsyncThunk('dashboard/getTotalMentees',
  async() =>{
      let totalMentees= 0;
      const q = query(collection(database, "Mentees"), where("documentOf", "!=", null));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        totalMentees+=1;
      });
      return totalMentees
  }
)

export const getWithMentors = createAsyncThunk('dashboard/getWithMentors',
  async() =>{
      let total =0;
      const q = query(collection(database, "Mentees"), where("status", "==", Status.Completed));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        total+=1;
      });
      return total

  }
)

export const getWithMentees = createAsyncThunk('dashboard/getWithMentees',
  async() =>{
      let total =0;
      const q = query(collection(database, "Mentors"), where("status", "==", Status.Completed));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        total+=1;
      });
      return total

  }
)

export const getNoMentors = createAsyncThunk('dashboard/getNoMentors',
  async() =>{
      let total =0;
      const q = query(collection(database, "Mentees"), where("status", "!=", Status.Completed));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        total+=1;
      });
      return total

  }
)

export const getNoMentees = createAsyncThunk('dashboard/getNoMentees',
  async() =>{
      let total =0;
      const q = query(collection(database, "Mentors"), where("status", "!=", Status.Completed));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        total+=1;
      });
      return total

  }
)

export interface HomeDataRows {
    rows: HomeTableData[]
    status: 'idle' | 'loading' | 'success' | 'error'
    totalMentors: number
    totalMentees: number
    noMentees: number
    noMentors: number
    withMentees: number
    withMentors: number
}

const initialState: HomeDataRows = {
    rows : [],
    status: 'idle',
    totalMentors: 0,
    totalMentees: 0,
    noMentees: 0,
    noMentors: 0,
    withMentees: 0,
    withMentors: 0
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        progressData: (state, action: PayloadAction<HomeTableData[]>) => {
           state.rows = action.payload.slice(); // Update rows with new data
           state.status = 'success'
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchMenteeCollection.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(fetchMenteeCollection.fulfilled, (state, action)=>{
            state.rows = action.payload;
            state.status = 'success'
        })
        builder.addCase(fetchMenteeCollection.rejected, (state) =>{
            state.status = 'error'
        })
        builder.addCase(updateDocStatus.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(updateDocStatus.fulfilled, ()=>{
            console.log("done");
        })
        builder.addCase(updateDocStatus.rejected, (state)=>{
            state.status = 'error'
        })
        builder.addCase(getTotalMentors.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(getTotalMentors.fulfilled, (state, action)=>{
            state.totalMentors = action.payload
        })
        builder.addCase(getTotalMentors.rejected, (state)=>{
            state.status = 'error'
        })
        builder.addCase(getTotalMentees.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(getTotalMentees.fulfilled, (state, action)=>{
            state.totalMentees = action.payload
        })
        builder.addCase(getTotalMentees.rejected, (state)=>{
            state.status = 'error'
        })
        builder.addCase(getNoMentors.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(getNoMentors.fulfilled, (state, action)=>{
            state.noMentors = action.payload
        })
        builder.addCase(getNoMentors.rejected, (state)=>{
            state.status = 'error'
        })
        builder.addCase(getNoMentees.pending, (state)=>{
            state.status = 'loading'
        })
        builder.addCase(getNoMentees.fulfilled, (state, action)=>{
            state.noMentees = action.payload
        })
        builder.addCase(getNoMentees.rejected, (state)=>{
            state.status = 'error'
        }),
        builder.addCase(updateDocInProgressStatus.fulfilled, ()=>{
            console.log("inprogress status")
        }),
        builder.addCase(getWithMentees.fulfilled, (state, action)=>{
          state.withMentees = action.payload
        }),
        builder.addCase(getWithMentors.fulfilled, (state, action)=>{
          state.withMentors = action.payload
        })
    }
})

export const {progressData} = dashboardSlice.actions;
export default dashboardSlice.reducer;

