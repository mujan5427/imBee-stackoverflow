import {
  createSlice, createAsyncThunk
} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = { keyword: '' };

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: { setKeyword: (state, action) => {
    state.keyword = action.payload;
  } },
  extraReducers: {}
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;