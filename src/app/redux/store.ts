import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./features/registration/registrationSlice";
import dashboardReducer from "./features/registration/dashboardSlice";

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        dashboard: dashboardReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;