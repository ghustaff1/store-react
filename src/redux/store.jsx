import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import categoriesReducer from "./slices/categoriesSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store=configureStore({
  reducer:{
    cart:cartReducer,
    categories:categoriesReducer,
    wishlist:wishlistReducer
  },
});