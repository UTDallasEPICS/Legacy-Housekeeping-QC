import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { InspectionCardProps } from "../src/components/inspections/Grid/props";
import { Clean_Status, Inspect_Status } from "@prisma/client";

export interface InspectionSelectionState {
  card_id: number;
  inspectionProps: InspectionCardProps;
}

const initialState: InspectionSelectionState = {
  card_id: 0,
  inspectionProps: {
    id: -1,
    room_id: -1,
    rubric_id: -1,
    inspect_status: Inspect_Status.NOT_INSPECTED,
    clean_status: Clean_Status.NOT_CLEANED,
    room_name: "",
    building_name: "",
    floor_number: 0,
    team_members: [],
    score: 0,
    comment: "",
    extra_score: 0,
  },
};

export const inspectionSelectionSlice = createSlice({
  name: "inspectionSelectionData",
  initialState,
  reducers: {
    setInspectionSelectionData: (state, action: PayloadAction<any>) => {
      const { card_id, inspections } = action.payload;
      state.card_id = card_id;
      state.inspectionProps = inspections;
    },
  },
});

export const { setInspectionSelectionData } = inspectionSelectionSlice.actions;

export const getSelectedCardId = (state: RootState) =>
  state.inspectionSelectionData.card_id;
export const getInspectionSelectionProps = (state: RootState) =>
  state.inspectionSelectionData.inspectionProps;

export default inspectionSelectionSlice.reducer;
