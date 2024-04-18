import { configureStore } from "@reduxjs/toolkit";
import memberFirstNameSlice from "./slices/memberProfileSlice";
import inspectionSlice from "./slices/inspectionSlice";
import buildingSelectSlice from "./slices/buildingSelectSlice";
import roomSelectSlice from "./slices/roomSelectSlice";
import inspectionsFetchSlice from "./slices/inspectionsFetchSlice";
import inspectionSelectionSlice from "./slices/inspectionSelectionSlice";
import inspectionMakerSlice from "./src/components/inspections/Reports/InspectionMakerSlice";

//Importing our reducers
export const store = configureStore({
  reducer: {
    memberProfile: memberFirstNameSlice,
    buildingSelect: buildingSelectSlice,
    inspectionData: inspectionSlice,
    roomSelect: roomSelectSlice,
    inspectionsFetchData: inspectionsFetchSlice,
    inspectionSelectionData: inspectionSelectionSlice,
    inspectionMakerData: inspectionMakerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
