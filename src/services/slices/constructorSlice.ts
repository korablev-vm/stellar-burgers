import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type IngredientsState = {
  constructor: {
    bun: TConstructorIngredient | null; // Selected bun
    ingredients: TConstructorIngredient[]; // Selected ingredients
  };
  buyBurgerStatus: boolean; // Status of the burger purchase
  orderData: TOrder | null; // Order details
};

const initialState: IngredientsState = {
  constructor: {
    bun: null,
    ingredients: []
  },
  buyBurgerStatus: false,
  orderData: null
};

// Async thunk for ordering a burger
export const BuyBurgerThunk = createAsyncThunk(
  'feeds/buyBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    // Add an ingredient to the constructor
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructor.bun = action.payload; // Replace the bun
        } else {
          state.constructor.ingredients.push(action.payload); // Add other ingredients
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid(); // Generate a unique ID for the ingredient
        return { payload: { ...ingredient, id } };
      }
    },
    // Remove an ingredient by ID
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    // Move an ingredient up in the list
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index - 1];
      state.constructor.ingredients[index - 1] = temp;
    },
    // Move an ingredient down in the list
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index + 1];
      state.constructor.ingredients[index + 1] = temp;
    },
    // Clear the constructor
    clearConstructor: (state) => {
      state.orderData = null;
      state.constructor.bun = null;
      state.constructor.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(BuyBurgerThunk.pending, (state) => {
        state.buyBurgerStatus = true; // Set loading state
      })
      .addCase(BuyBurgerThunk.fulfilled, (state, action) => {
        state.buyBurgerStatus = false; // Reset loading state
        state.orderData = action.payload.order; // Save order data
      })
      .addCase(BuyBurgerThunk.rejected, (state, action) => {
        state.buyBurgerStatus = false; // Reset loading state
        console.error(state, action); // Log error
      });
  },
  selectors: {
    getConstructorIngredients: (state) => state.constructor, // Get constructor data
    getStatusBuyBurger: (state) => state.buyBurgerStatus, // Get purchase status
    getOrderData: (state) => state.orderData // Get order details
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  clearConstructor
} = constructorSlice.actions;
export const { getConstructorIngredients, getStatusBuyBurger, getOrderData } =
  constructorSlice.selectors;
