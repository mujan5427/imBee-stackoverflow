import {
  createSlice, createAsyncThunk
} from '@reduxjs/toolkit';
import { getQuestionList } from '@/service/question';
import _ from 'lodash';

const initialState = {
  list: [],
  page: {
    hasNextPage: false,
    currentPage: 1
  },
  api: { getQuestion: {
    loading: false,
    loaded: false,
    error: false
  } },
  source: {}
};

export const fetchData = createAsyncThunk('question/fetchData', async (payload) => {
  const res = await getQuestionList(payload);

  const questionCard = res.data.items.map((item) => {
    return {
      id: item.question_id,
      title: item.title,
      score: item.score,
      answer_count: item.answer_count,
      view_count: item.view_count,
      is_answered: item.is_answered,
      link: item.link,
      owner: {
        name: item.owner.display_name,
        image: item.owner.profile_image
      }
    };
  });

  let result = {
    page: { hasNextPage: res.data.has_more },
    questionCard
  };

  return result;
});

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: { resetPagination: (state, action) => {
    state.api.getQuestion.loading = false;
    state.api.getQuestion.loaded = false;
    state.api.getQuestion.error = false;

    state.list = [];
    state.page = {
      hasNextPage: false,
      currentPage: 1
    };
  } },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.api.getQuestion.loading = true;
      state.api.getQuestion.error = false;
    },

    [fetchData.fulfilled]: (state, action) => {
      const questionCardList = action.payload.questionCard.map((item) => item.id);
      let questionCardData = {};

      state.api.getQuestion.loading = false;
      state.api.getQuestion.loaded = true;

      // setting list sort data
      state.list = [...state.list, ...questionCardList];

      // setting pagination data
      if (action.payload.page.hasNextPage) {
        state.page = {
          ...action.payload.page,
          currentPage: state.page.currentPage + 1
        };
      }

      // setting question data
      action.payload.questionCard.forEach((item) => {
        questionCardData[item.id] = item;
      });

      state.source = {
        ...state.source,
        ...questionCardData
      };
    },

    [fetchData.rejected]: (state) => {
      state.api.getQuestion.loading = false;
      state.api.getQuestion.error = true;
    }
  }
});

export const { resetPagination } = questionSlice.actions;
export default questionSlice.reducer;