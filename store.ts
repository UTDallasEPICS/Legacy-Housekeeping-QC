import { configureStore } from "@reduxjs/toolkit";
import memberFirstNameSlice from "./slices/memberProfileSlice";
import inspectionSlice from "./slices/inspectionSlice";
import buildingSelectSlice from "./slices/buildingSelectSlice";
import roomSelectSlice from "./slices/roomSelectSlice";

//Importing our reducers
export const store = configureStore({
  reducer: {
    memberProfile: memberFirstNameSlice,
    buildingSelect: buildingSelectSlice,
    inspectionData: inspectionSlice,
    roomSelect: roomSelectSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
