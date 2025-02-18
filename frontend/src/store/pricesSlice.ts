import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Item {
  id: string;
  price: number;
  shake: boolean;
  trend: 'UP' | 'DOWN' | null;
}

interface PricesState {
  [id: string]: Item;
}

const initialState: PricesState = {};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      const previousPrice = state[id]?.price ?? price;
      const priceChangePercentage =
        previousPrice > 0 ? Math.abs((price - previousPrice) / previousPrice) * 100 : 0;


      state[id] = {
        id,
        price,
        shake: priceChangePercentage >= 25,
        trend: price > previousPrice ? 'UP' : price < previousPrice ? 'DOWN' : null,
      };
    },
  },
});

export const { updatePrice } = pricesSlice.actions;
export default pricesSlice;
