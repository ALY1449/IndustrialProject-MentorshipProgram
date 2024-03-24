'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { Status } from "./state/dashboard/status/status";

export interface dashboardData {
    home: HomeTableData
}

const initialState: dashboardData = {
    home: {
        avatar: "",
        fullName: "",
        registeredOn: "",
        status: Status.Incomplete,
        mentor: "",
        action: true
    }
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        progressData: (state, action: PayloadAction<HomeTableData>) => {
            state.home.avatar = action.payload.avatar,
            state.home.fullName = action.payload.fullName,
            state.home.registeredOn = action.payload.registeredOn,
            state.home.status = action.payload.status,
            state.home.mentor = action.payload.mentor,
            state.home.action = action.payload.action
        }
    }
})

export const {progressData} = dashboardSlice.actions;
export default dashboardSlice.reducer;

