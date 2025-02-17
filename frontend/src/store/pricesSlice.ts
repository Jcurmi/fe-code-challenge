import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  price: number;
}

interface PriceState {
  [key: string]: {
    price: number;
    alert: boolean;
    trend: 'UP' | 'DOWN' | null;
  };
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState: {} as PriceState,
  reducers: {
    updatePrice: (state, action: PayloadAction<Item>) => {
      const { id, price } = action.payload;
      const previousPrice = state[id]?.price;

      const priceChangePercentage = Math.abs((price - previousPrice) / previousPrice) * 100;
      state[id] = {
        price,
        alert: priceChangePercentage >= 25,
        trend: price > previousPrice ? 'UP' : price < previousPrice ? 'DOWN' : null


      };
    },
    resetShake: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state[id]) {
        state[id].alert = false;
      }
    },
  },
});

export const { updatePrice, resetShake } = pricesSlice.actions;
export default pricesSlice;