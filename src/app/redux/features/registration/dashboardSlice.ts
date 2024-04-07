'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { fetchMenteeCollection, updateDocStatus } from "./actions/actions";


export interface HomeDataRows {
    rows: HomeTableData[]
    status: 'idle' | 'loading' | 'success' | 'error'
}

const initialState: HomeDataRows = {
    rows : [],
    status: 'idle'
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
    }
})

export const {progressData} = dashboardSlice.actions;
export default dashboardSlice.reducer;

