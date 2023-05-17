import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";

export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  try {
    const { data } = await axios.get("/AddNew");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const fetchCategory = createAsyncThunk("ads/fetchCategory", async () => {
  try {
    const { data } = await axios.get("/category");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const removeAdSuccess = (itemId) => ({
  type: "REMOVE_AD_SUCCESS",
  payload: itemId,
});
const initialState = {
  ads: {
    items: [],
    status: "loading",
  },
  category: {
    items: [],
    status: "loading",
  },
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.ads.items = action.payload;
    },

    removeItem: (state, action) => {
      state.ads.items = state.ads.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: {
    // ПОЛУЧЕНИЕ ОБЪЯВЛЕНИЙ
    [fetchAds.pending]: (state) => {
      state.ads.items = [];
      state.ads.status = "loading";
    },
    [fetchAds.fulfilled]: (state, action) => {
      state.ads.items = action.payload;
      state.ads.status = "loaded";
    },
    [fetchAds.rejected]: (state) => {
      state.ads.items = [];
      state.ads.status = "error";
    },
    // ПОЛУЧЕНИЕ КАТЕГОРИЙ
    [fetchCategory.pending]: (state) => {
      state.category.items = [];
      state.category.status = "loading";
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.category.items = action.payload;
      state.category.status = "loaded";
    },
    [fetchCategory.rejected]: (state) => {
      state.category.items = [];
      state.category.status = "error";
    },
  },
});
export const { setItems, removeAd } = adsSlice.actions;
export const adsReducer = adsSlice.reducer;
