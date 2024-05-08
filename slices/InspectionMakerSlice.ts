import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { InspectItemProps } from "../src/components/inspections/Reports/ItemChecklist/props";

export interface ImageUploadProps {
  name: string;
  url: string;
}

export interface ItemCategoryProps {
  [key: string]: InspectItemProps[];
}

export interface InspectionMakerState {
  items: ItemCategoryProps;
  comment: string;
  extra_score: number;
  room_pics: ImageUploadProps[];
}

const initialState: InspectionMakerState = {
  items: {},
  comment: "",
  extra_score: 0,
  room_pics: [],
};

export const inspectionMakerSlice = createSlice({
  name: "inspectionMakerData",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ItemCategoryProps>) => {
      state.items = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    setExtraScore: (state, action: PayloadAction<number>) => {
      state.extra_score = action.payload;
    },
    setRoomPics: (state, action: PayloadAction<ImageUploadProps[]>) => {
      state.room_pics = action.payload;
    },
  },
});

export const { setItems, setComment, setExtraScore, setRoomPics } =
  inspectionMakerSlice.actions;

export const getItems = (state: RootState) => state.inspectionMakerData.items;

export const getComment = (state: RootState) =>
  state.inspectionMakerData.comment;

export const getExtraScore = (state: RootState) =>
  state.inspectionMakerData.extra_score;

export const getRoomPics = (state: RootState) =>
  state.inspectionMakerData.room_pics;

export default inspectionMakerSlice.reducer;
