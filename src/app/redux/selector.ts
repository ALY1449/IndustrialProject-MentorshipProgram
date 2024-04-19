import { RootState } from "./store";

export const personalDetailsSelector = (state: RootState) =>
  state.registration.user;
export const mentorProfessionalDetailsSelector = (state: RootState) =>
  state.registration.mentorProfessionalDetailsData;
export const mentorPreferencesSelector = (state: RootState) =>
  state.registration.mentorPreferences;
export const skillsSelector = (state: RootState) => state.registration.skills;
export const goalsSelector = (state: RootState) => state.registration.goals;
export const personalityTypeSelector = (state: RootState) =>
  state.registration.personalityType;
export const menteePreferencesSelector = (state: RootState) =>
  state.registration.menteePreferences;
export const menteeEducationalBackgroundSelector = (state: RootState) =>
  state.registration.menteeEducationalBackground;
