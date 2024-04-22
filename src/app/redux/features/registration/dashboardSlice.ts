"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HomeTableData } from "./state/dashboard/home-table-data";
import { FetchCollection } from "./actions/dashboard/FetchCollection";
import { UpdateStatustoComplete } from "./actions/dashboard/UpdateStatustoComplete";
import { UpdateStatustoInProgress } from "./actions/dashboard/UpdateStatustoInProgress";
import { FetchTotalMentors } from "./actions/dashboard/FetchTotalMentors";
import { FetchTotalMentees } from "./actions/dashboard/FetchTotalMentees";
import { FetchNoMentors } from "./actions/dashboard/FetchNoMentors";
import { FetchNoMentees } from "./actions/dashboard/FetchNoMentees";
import { FetchMentorsWithMentees } from "./actions/dashboard/FetchMentorsWithMentees";
import { FetchMenteesWithMentors } from "./actions/dashboard/FetchMenteesWithMentors";
import { FetchMenteesPairedOnThisDay } from "./actions/dashboard/FetchMenteesPairedOnThisDay";
import { FetchMentorsPairedOnThisDay } from "./actions/dashboard/FetchMentorsPairedOnThisDay";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface HomeDataRows {
  rows: HomeTableData[];
  status: APIStatus;
  totalMentors: number;
  totalMentorsStatus: APIStatus;
  totalMentees: number;
  totalMenteesStatus: APIStatus;
  noMentees: number;
  noMenteesStatus: APIStatus;
  noMentors: number;
  noMentorsStatus: APIStatus;
  withMentees: number;
  withMenteesStatus: APIStatus;
  withMentors: number;
  withMentorsStatus: APIStatus;
  getTotalMenteesSpecificDay: number;
  getTotalMenteesSpecificDayStatus: APIStatus;
  getTotalMentorsSpecificDay: number;
  getTotalMentorsSpecificDayStatus: APIStatus;
}

const initialState: HomeDataRows = {
  rows: [],
  status: APIStatus.idle,
  totalMentors: 0,
  totalMentorsStatus: APIStatus.idle,
  totalMentees: 0,
  totalMenteesStatus: APIStatus.idle,
  noMentees: 0,
  noMenteesStatus: APIStatus.idle,
  noMentors: 0,
  noMentorsStatus: APIStatus.idle,
  withMentees: 0,
  withMenteesStatus: APIStatus.idle,
  withMentors: 0,
  withMentorsStatus: APIStatus.idle,
  getTotalMenteesSpecificDay: 0,
  getTotalMenteesSpecificDayStatus: APIStatus.idle,
  getTotalMentorsSpecificDay: 0,
  getTotalMentorsSpecificDayStatus: APIStatus.idle,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    progressData: (state, action: PayloadAction<HomeTableData[]>) => {
      state.rows = action.payload.slice(); // Update rows with new data
      state.status = APIStatus.success;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchCollection.pending, (state) => {
        state.status = APIStatus.loading;
      })
      .addCase(
        FetchCollection.fulfilled,
        (state, action: PayloadAction<HomeTableData[]>) => {
          state.rows = action.payload;
          state.status = APIStatus.success;
        }
      )
      .addCase(FetchCollection.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(UpdateStatustoComplete.pending, (state) => {
        state.status = APIStatus.loading;
      })
      .addCase(UpdateStatustoComplete.fulfilled, (state) => {
        state.status = APIStatus.success;
      })
      .addCase(UpdateStatustoComplete.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(UpdateStatustoInProgress.pending, (state) => {
        state.status = APIStatus.loading;
      })
      .addCase(UpdateStatustoInProgress.fulfilled, (state) => {
        state.status = APIStatus.success;
      })
      .addCase(UpdateStatustoInProgress.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(FetchTotalMentors.pending, (state) => {
        state.totalMentorsStatus = APIStatus.loading;
      })
      .addCase(FetchTotalMentors.fulfilled, (state, action) => {
        state.totalMentors = action.payload;
        state.totalMentorsStatus = APIStatus.success;
      })
      .addCase(FetchTotalMentors.rejected, (state) => {
        state.totalMentorsStatus = APIStatus.error;
      });
    builder
      .addCase(FetchTotalMentees.pending, (state) => {
        state.totalMenteesStatus = APIStatus.loading;
      })
      .addCase(FetchTotalMentees.fulfilled, (state, action) => {
        state.totalMentees = action.payload;
        state.totalMenteesStatus = APIStatus.success;
      })
      .addCase(FetchTotalMentees.rejected, (state) => {
        state.totalMenteesStatus = APIStatus.error;
      });
    builder
      .addCase(FetchNoMentors.pending, (state) => {
        state.noMentorsStatus = APIStatus.loading;
      })
      .addCase(FetchNoMentors.fulfilled, (state, action) => {
        state.noMentors = action.payload;
        state.noMentorsStatus = APIStatus.success;
      })
      .addCase(FetchNoMentors.rejected, (state) => {
        state.noMentorsStatus = APIStatus.error;
      });
    builder
      .addCase(FetchNoMentees.pending, (state) => {
        state.noMenteesStatus = APIStatus.loading;
      })
      .addCase(FetchNoMentees.fulfilled, (state, action) => {
        state.noMentees = action.payload;
        state.noMenteesStatus = APIStatus.success;
      })
      .addCase(FetchNoMentees.rejected, (state) => {
        state.noMenteesStatus = APIStatus.error;
      });
    builder
      .addCase(FetchMentorsWithMentees.pending, (state) => {
        state.withMenteesStatus = APIStatus.loading;
      })
      .addCase(FetchMentorsWithMentees.fulfilled, (state, action) => {
        state.withMentees = action.payload;
        state.withMenteesStatus = APIStatus.success;
      })
      .addCase(FetchMentorsWithMentees.rejected, (state) => {
        state.withMenteesStatus = APIStatus.error;
      });
    builder
      .addCase(FetchMenteesWithMentors.pending, (state) => {
        state.withMentorsStatus = APIStatus.loading;
      })
      .addCase(FetchMenteesWithMentors.fulfilled, (state, action) => {
        state.withMentors = action.payload;
        state.withMentorsStatus = APIStatus.success;
      })
      .addCase(FetchMenteesWithMentors.rejected, (state) => {
        state.withMentorsStatus = APIStatus.error;
      });
    builder
      .addCase(FetchMenteesPairedOnThisDay.pending, (state) => {
        state.getTotalMenteesSpecificDayStatus = APIStatus.loading;
      })
      .addCase(FetchMenteesPairedOnThisDay.fulfilled, (state, action) => {
        state.getTotalMenteesSpecificDay = action.payload;
        state.getTotalMenteesSpecificDayStatus = APIStatus.success;
      })
      .addCase(FetchMenteesPairedOnThisDay.rejected, (state) => {
        state.getTotalMenteesSpecificDayStatus = APIStatus.error;
      });
    builder
      .addCase(FetchMentorsPairedOnThisDay.pending, (state) => {
        state.getTotalMentorsSpecificDayStatus = APIStatus.loading;
      })
      .addCase(FetchMentorsPairedOnThisDay.fulfilled, (state, action) => {
        state.getTotalMentorsSpecificDay = action.payload;
        state.getTotalMentorsSpecificDayStatus = APIStatus.success;
      })
      .addCase(FetchMentorsPairedOnThisDay.rejected, (state) => {
        state.getTotalMentorsSpecificDayStatus = APIStatus.error;
      });
  },
});

export const { progressData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
