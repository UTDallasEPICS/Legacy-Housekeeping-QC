import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface RemainingInspectionState {
  report: any;
}

const initialState: RemainingInspectionState = {
  report: null,
};

export const inspectionSlice = createSlice({
  name: "inspectionData",
  initialState,
  reducers: {
    setInspectionData: (state, action: PayloadAction<any>) => {
      const { report } = action.payload;
      state.report = report;
    },
  },
});

export const { setInspectionData } = inspectionSlice.actions;

export const selectReport = (state: RootState) => state.inspectionData.report;

export default inspectionSlice.reducer;
