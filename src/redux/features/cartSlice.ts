import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../types";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  isProductInStock: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        if (existingItem.quantity! < newItem.availableQuantity) {
          existingItem.quantity!++;
          state.totalPrice += newItem.price;
        }
      } else if (newItem.availableQuantity > 0) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalPrice += newItem.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalPrice -= existingItem.price * existingItem.quantity!;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && quantity <= existingItem.availableQuantity) {
        state.totalPrice -= existingItem.price * existingItem.quantity!;
        existingItem.quantity = quantity;
        state.totalPrice += existingItem.price * quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    setStockStatus: (state, action: PayloadAction<boolean>) => {
      state.isProductInStock = action.payload;
    },
  },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.totalPrice;

export const selectStockStatus = (state: { cart: CartState }) =>
  state.cart.isProductInStock;

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setStockStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
