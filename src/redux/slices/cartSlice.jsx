import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) { //action.payload={id:01, amount:3, price:123}
      state.items.push({
        ...action.payload
      });
      state.totalPrice += action.payload.price;
      
    },
    removeItem(state, action) { //action.payload={}
      state.totalPrice -= action.payload.price;
      state.items=state.items.filter(obj => obj.id !== action.payload.id);
    },
  }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;