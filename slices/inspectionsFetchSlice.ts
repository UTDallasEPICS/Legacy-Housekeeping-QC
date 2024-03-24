import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Inspection } from "../ts/types/db.interfaces";

export interface InspectionFetchState {
  inspections: Inspection[] | null;
}

const initialState: InspectionFetchState = {
  inspections: null,
};

export const inspectionsFetchSlice = createSlice({
  name: "inspectionsFetchData",
  initialState,
  reducers: {
    setInspectionsFetchData: (state, action: PayloadAction<any>) => {
      const { inspections } = action.payload;
      state.inspections = inspections;
    },
  },
});

export const { setInspectionsFetchData } = inspectionsFetchSlice.actions;

export const getInspections = (state: RootState) =>
  state.inspectionsFetchData.inspections;

export default inspectionsFetchSlice.reducer;
