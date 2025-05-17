import { getOrdersApi, TOrdersResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUesrOrders = {
  isLoad: boolean;
  userOrders: TOrder[];
};

const initialState: TUesrOrders = {
  isLoad: false,
  userOrders: []
};

export const userOrdersThunk = createAsyncThunk(
  'orders/getuserOrders',
  async () => await getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userOrdersThunk.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(userOrdersThunk.fulfilled, (state, action) => {
        state.isLoad = false;
        state.userOrders = action.payload;
      })
      .addCase(userOrdersThunk.rejected, (state, action) => {
        state.isLoad = false;
        console.error(state, action);
      });
  },
  selectors: {
    isload: (state) => state.isLoad,
    getUserOrders: (state) => state.userOrders
  }
});

export const { isload, getUserOrders } = ordersSlice.selectors;
