// cartSlice.ts
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '@/modules/products/domain';

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (action.payload.stockQuantity > 0) state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    cleanCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart,removeFromCart,cleanCart } = cartSlice.actions;


export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
