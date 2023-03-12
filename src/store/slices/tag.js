import {
  createSlice, createAsyncThunk
} from '@reduxjs/toolkit';
import { getTagListAPI } from '@/service/tag';
import _ from 'lodash';

const initialState = {
  list: [],
  api: { getTagList: {
    loading: false,
    loaded: false,
    error: false
  } }
};

export const getTagList = createAsyncThunk('tag/fetchData', async (payload) => {
  const res = await getTagListAPI(payload);

  return res.data.items.map((item) => item.name);
});

export const questionSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: {
    [getTagList.pending]: (state) => {
      state.api.getTagList.loading = true;
    },

    [getTagList.fulfilled]: (state, action) => {
      state.api.getTagList.loading = false;
      state.api.getTagList.loaded = true;

      state.list = [...state.list, ...action.payload];
    },

    [getTagList.rejected]: (state) => {
      state.api.getTagList.loading = false;
      state.api.getTagList.error = true;
    }
  }
});

export default questionSlice.reducer;