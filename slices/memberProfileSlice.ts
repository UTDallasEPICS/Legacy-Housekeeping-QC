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
  addressLine: string;
  city: string;
  state: string;
  zipcode: string;
  memberId: string;
}

const initialState: FirstNameState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  stateCode: "",
  phoneNumber: "",
  addressLine: "",
  city: "",
  state: "",
  zipcode: "",
  memberId: "",
};

export const memberProfileSlice = createSlice({
  name: "memberProfile",
  initialState,
  reducers: {
    setMemberProfile: (state, action: PayloadAction<any>) => {
      const {
        firstName,
        lastName,
        email,
        countryCode,
        stateCode,
        phoneNumber,
        addressLine,
        city,
        stateUS,
        zipcode,
        memberId,
      } = action.payload;

      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.countryCode = countryCode;
      state.stateCode = stateCode;
      state.phoneNumber = phoneNumber;
      state.addressLine = addressLine;
      state.city = city;
      state.state = stateUS;
      state.zipcode = zipcode;
      state.memberId = memberId;
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

export const selectAddressLine = (state: RootState) =>
  state.memberProfile.addressLine;

export const selectCity = (state: RootState) => state.memberProfile.city;

export const selectState = (state: RootState) => state.memberProfile.state;

export const selectZipcode = (state: RootState) => state.memberProfile.zipcode;

export const selectMemberId = (state: RootState) =>
  state.memberProfile.memberId;

export default memberProfileSlice.reducer;
