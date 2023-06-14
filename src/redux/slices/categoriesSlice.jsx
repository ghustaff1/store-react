import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategoriesStatus',
  async () => {
    const res = await axios('http://localhost:8000/categories');
    return res.data;
  }
)


const initialState = {
  categories: [],
  links: [
    { 'frnveg': 'Fruits and vegetables' },
    { 'bakery': 'Bakery' },
    { 'meatnfish': 'Meat and fish' },
    { 'drinks': 'Drinks' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
  }
});

export const getPathByCategory = (category) => {
  return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
}
export const getCategoryFromPath = (path) => {
  // return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
  // console.log(path)
  return Object.values(initialState.links.find(obj =>Object.keys(obj)[0] === path))[0];
}

export default categoriesSlice.reducer;
