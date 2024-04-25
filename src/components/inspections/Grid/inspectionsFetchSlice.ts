import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store";
import { Inspection } from "../../../../ts/types/db.interfaces";

export interface InspectionFetchState {
  inspected: Inspection[] | null;
  notInspected: Inspection[] | null;
  dateFilter: string;
}

const initialState: InspectionFetchState = {
  inspected: null,
  notInspected: null,
  dateFilter: "",
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
    setDateFilter: (state, action: PayloadAction<string>) => {
      state.dateFilter = action.payload;
    },
  },
});

export const { setInspectionsFetchData, setDateFilter } =
  inspectionsFetchSlice.actions;

export const getDateFilter = (state: RootState) =>
  state.inspectionsFetchData.dateFilter;

export const getInspectedReports = (state: RootState) =>
  state.inspectionsFetchData.inspected;

export const getNotInspectedReports = (state: RootState) =>
  state.inspectionsFetchData.notInspected;

export default inspectionsFetchSlice.reducer;
