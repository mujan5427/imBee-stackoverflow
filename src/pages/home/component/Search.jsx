import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';

import '@/pages/home/component/Search.scss';

import {
  fetchData, resetPagination
} from '@/store/slices/question';
import { setKeyword } from '@/store/slices/search';

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const question = useSelector((state) => state.question);
  const [formData, setFormData] = useState({ search: '' });

  useEffect(() => {
    if (formData.search.length > 0) {
      if (question.page.currentPage > 1) {
        dispatch(resetPagination());
      }

      if (search.keyword === formData.search) {
        searchByKeyword(search.keyword);
      } else {
        fetchSearchData(formData.search);
      }
    }
  }, [formData.search]);

  useEffect(() => {
    if (!!search.keyword) {
      if (search.keyword === formData.search) {
        searchByKeyword(search.keyword);
      } else {
        setFormData({ search: search.keyword });
      }
    }
  }, [search.keyword]);

  const debounce = (cb, delay = 250) => {
    let timerId = null;

    return (value) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => cb(value), delay);
    };
  };

  const handleChange = (e) => {
    setFormData({ search: e.target.value });
  };

  const searchByKeyword = (value) => {
    const payload = { params: {
      page: question.page.currentPage,
      pagesize: 20,
      order: 'desc',
      site: 'stackoverflow',
      tagged: value,
      filter: 'default'
    } };

    // avoiding race condition
    const cacheKey = `${payload.params.page}_${payload.params.tagged}`;

    if (localStorage.getItem(cacheKey) === null) {
      localStorage.setItem(cacheKey, 'true');
      dispatch(fetchData(payload));
    }
  };

  const fetchSearchData = useCallback(debounce((value) => {
    dispatch(setKeyword(value));
  }, 800), []);

  return (
    <div className="search">
      <input
        onChange={handleChange}
        value={formData.search}
        className="search__input-field"
        placeholder="Tag"
      />
      <div className="search__suffix">Search</div>
    </div>
  );
};

export default Search;