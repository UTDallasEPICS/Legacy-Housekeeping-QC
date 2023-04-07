import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface RemainingInspectionState {
  buildingId: String;
  roomId: String;
  teamMember: String;
  time: String;
}

const initialState: RemainingInspectionState = {
  buildingId: "",
  roomId: "",
  teamMember: "",
  time: "",
};

export const inspectionSlice = createSlice({
  name: "inspectionData",
  initialState,
  reducers: {
    setInspectionData: (state, action: PayloadAction<any>) => {
      const { buildingId, roomId, teamMember, time } = action.payload;
      state.buildingId = buildingId;
      state.roomId = roomId;
      state.teamMember = teamMember;
      state.time = time;
    },
  },
});

export const { setInspectionData } = inspectionSlice.actions;

export const selectBuildingId = (state: RootState) =>
  state.inspectionData.buildingId;

export const selectRoomId = (state: RootState) => state.inspectionData.roomId;

export const selectTeamMember = (state: RootState) =>
  state.inspectionData.teamMember;

export const selectTime = (state: RootState) => state.inspectionData.time;

export default inspectionSlice.reducer;
