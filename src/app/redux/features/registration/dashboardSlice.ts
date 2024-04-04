'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { fetchMenteeCollection, updateDocStatus } from "./actions/actions";


export interface HomeDataRows {
    rows: HomeTableData[]
}

const initialState: HomeDataRows = {
    rows : []
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        progressData: (state, action: PayloadAction<HomeTableData[]>) => {
           state.rows = action.payload.slice(); // Update rows with new data
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchMenteeCollection.fulfilled, (state, action)=>{
            state.rows = action.payload;
        })
        builder.addCase(updateDocStatus.fulfilled, ()=>{
            console.log("done");
        })
    }
})

export const {progressData} = dashboardSlice.actions;
export default dashboardSlice.reducer;

