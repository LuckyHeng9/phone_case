import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: null,
  selectedTemplate: "iPhone 13 Pro Max",
  backgroundColor: "#f87171",
  renderedDimension: { height: 200, width: 150 },
  renderedPosition: { x: 150, y: 205 },
};

const casePhoneSlice = createSlice({
  name: "casePhone",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setRenderedDimension: (state, action) => {
      state.renderedDimension = action.payload;
    },
    setRenderedPosition: (state, action) => {
      state.renderedPosition = action.payload;
    },
    resetDesign: (state) => {
      state.imageUrl = null;
      state.selectedTemplate = "iPhone 13 Pro Max";
      state.backgroundColor = "#f87171";
      state.renderedDimension = { height: 200, width: 150 };
      state.renderedPosition = { x: 150, y: 205 };
    },
  },
});

export const {
  setImageUrl,
  setSelectedTemplate,
  setBackgroundColor,
  setRenderedDimension,
  setRenderedPosition,
  resetDesign,
} = casePhoneSlice.actions;
export const casePhone = (state) => state.casePhone;

export default casePhoneSlice.reducer;
