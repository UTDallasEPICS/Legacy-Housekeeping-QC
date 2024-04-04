import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FirstNameState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  memberId: string;
}

const initialState: FirstNameState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
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
        memberId,
      } = action.payload;

      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
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


export const selectPhoneNumber = (state: RootState) =>
  state.memberProfile.phoneNumber;

export const selectMemberId = (state: RootState) =>
  state.memberProfile.memberId;

export default memberProfileSlice.reducer;
