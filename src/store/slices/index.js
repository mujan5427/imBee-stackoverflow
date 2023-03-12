import searchReducer from './search';
import tagReducer from './tag';
import questionReducer from './question';

const reducers = {
  search: searchReducer,
  tag: tagReducer,
  question: questionReducer
};

export default reducers;