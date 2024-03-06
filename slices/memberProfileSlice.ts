import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FirstNameState {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  stateCode: string;
  phoneNumber: string;
  memberId: number;
}

const initialState: FirstNameState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  stateCode: "",
  phoneNumber: "",
  memberId: -1,
};

export const memberProfileSlice = createSlice({
  name: "memberProfile",
  initialState,
  reducers: {
    setMemberProfile: (state, action: PayloadAction<any>) => {
      const {
        first_name,
        last_name,
        email,
        country_code,
        state_code,
        phone_number,
        id,
      } = action.payload;

      state.firstName = first_name;
      state.lastName = last_name;
      state.email = email;
      state.countryCode = country_code;
      state.stateCode = state_code;
      state.phoneNumber = phone_number;
      state.memberId = id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMemberProfile } = memberProfileSlice.actions;

export const selectFirstName = (state: RootState) =>
  state.memberProfile.firstName;

export const selectLastName = (state: RootState) =>
  state.memberProfile.lastName;

export const selectEmail = (state: RootState) => state.memberProfile.email;

export const selectCountryCode = (state: RootState) =>
  state.memberProfile.countryCode;

export const selectStateCode = (state: RootState) =>
  state.memberProfile.stateCode;

export const selectPhoneNumber = (state: RootState) =>
  state.memberProfile.phoneNumber;

export const selectMemberId = (state: RootState) =>
  state.memberProfile.memberId;

export default memberProfileSlice.reducer;
