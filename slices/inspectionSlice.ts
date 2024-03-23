import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Inspection } from "../ts/types/db.interfaces";

export interface InspectionState {
  inspection: Inspection | null;
}

const initialState: InspectionState = {
  inspection: null,
};

export const inspectionSlice = createSlice({
  name: "inspectionData",
  initialState,
  reducers: {
    setInspectionData: (state, action: PayloadAction<any>) => {
      const { inspection } = action.payload;
      state.inspection = inspection;
    },
  },
});

export const { setInspectionData } = inspectionSlice.actions;

export const selectReport = (state: RootState) =>
  state.inspectionData.inspection;

export default inspectionSlice.reducer;
