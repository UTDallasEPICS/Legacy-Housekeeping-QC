import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface roomSelectState {
  room: string;
}

//Since user hasnt selected a room yet
const initialState = { room: "N/A" } as roomSelectState;

//Will be used to filter what building we chose
export const roomSelectSlice = createSlice({
  name: "roomSelect",
  initialState,

  //This will be our reducer to set the building
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

//We export all of our actions
export const { setRoom } = roomSelectSlice.actions;

/*
export const selectBuilding = (state: RootState) => {
  state.buildingSelect.building;
};*/

export default roomSelectSlice.reducer;
