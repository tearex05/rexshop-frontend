import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = {
        id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        number: 1,
      };
      return [...state, item];
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload._id);
    },
    removeAll: (state, action) => {
      return [];
    },
    increaseNumber: (state, action) => {
      const item = state.filter((i) => i.id === action.payload._id);
      if (item[0].number < 10){
        item[0].number += 1;
      }
    },
    decreaseNumber: (state, action) => {
      const item = state.filter((i) => i.id === action.payload._id);
      if (item[0].number > 1) {
        item[0].number -= 1;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseNumber,
  decreaseNumber,
  removeAll,
} = itemSlice.actions;

export default itemSlice.reducer;
