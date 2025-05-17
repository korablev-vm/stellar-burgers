import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type IngredientsState = {
  feeds: TOrdersData; // Data for all orders
};

const initialState: IngredientsState = {
  feeds: {
    orders: [], // List of orders
    total: 0, // Total number of orders
    totalToday: 0 // Total orders today
  }
};

// Async thunk to fetch all feeds
export const FeedsThunk = createAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FeedsThunk.fulfilled, (state, action) => {
        state.feeds = action.payload; // Update feeds data
      })
      .addCase(FeedsThunk.rejected, (state, action) => {
        console.error(state, action); // Log error
      });
  },
  selectors: {
    getOrders: (state) => state.feeds.orders, // Get list of orders
    getTotal: (state) => state.feeds.total, // Get total orders
    getTotalToday: (state) => state.feeds.totalToday // Get today's orders
  }
});

export const { getOrders, getTotal, getTotalToday } = feedSlice.selectors;
