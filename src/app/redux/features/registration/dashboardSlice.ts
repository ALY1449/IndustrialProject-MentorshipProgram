'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { fetchMenteeCollection, getNoMentees, getNoMentors, getTotalMentees, getTotalMentors, updateDocStatus } from "./actions/actions";


export interface HomeDataRows {
    rows: HomeTableData[]
    status: 'idle' | 'loading' | 'success' | 'error'
    totalMentors: number
    totalMentees: number
    noMentees: number
    noMentors: number
}

const initialState: HomeDataRows = {
    rows : [],
    status: 'idle',
    totalMentors: 0,
    totalMentees: 0,
    noMentees: 0,
    noMentors: 0,
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
        })
    }
})

export const {progressData} = dashboardSlice.actions;
export default dashboardSlice.reducer;

