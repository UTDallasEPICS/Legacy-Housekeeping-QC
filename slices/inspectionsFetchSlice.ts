import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Inspection } from "../ts/types/db.interfaces";

export interface InspectionFetchState {
  inspected: Inspection[] | null;
  notInspected: Inspection[] | null;
}

const initialState: InspectionFetchState = {
  inspected: null,
  notInspected: null,
};

export const inspectionsFetchSlice = createSlice({
  name: "inspectionsFetchData",
  initialState,
  reducers: {
    setInspectionsFetchData: (state, action: PayloadAction<any>) => {
      const { inspected, notInspected } = action.payload;
      state.inspected = inspected;
      state.notInspected = notInspected;
    },
  },
});

export const { setInspectionsFetchData } = inspectionsFetchSlice.actions;

export const getInspectedReports = (state: RootState) =>
  state.inspectionsFetchData.inspected;

export const getNotInspectedReports = (state: RootState) =>
  state.inspectionsFetchData.notInspected;

export default inspectionsFetchSlice.reducer;
