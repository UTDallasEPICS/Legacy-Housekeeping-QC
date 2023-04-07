import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface buildingSelectState {
  building: string;
}

//Since user hasnt selected a room yet
const initialState = { building: "N/A" } as buildingSelectState;

//Will be used to filter what building we chose
const buildingSelectSlice = createSlice({
  name: "buildingSelect",
  initialState,
  reducers: {
    setBuilding: (state, action) => {
      state.building = action.payload;
    },
  },
});

//We export all of our actions
export const { setBuilding } = buildingSelectSlice.actions;
export default buildingSelectSlice.reducer;
