import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import clsx from 'clsx';

import { setKeyword } from '@/store/slices/search';
import { resetPagination } from '@/store/slices/question';

import '@/pages/home/component/Trending.scss';

const TrendingTag = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const question = useSelector((state) => state.question);
  const tag = useSelector((state) => state.tag);

  useEffect(() => {
    if (tag.api.getTagList.loaded && tag.list.length > 0) {
      const firstTag = tag.list[0];

      setTag(firstTag);
    }
  }, [tag.api.getTagList.loaded]);

  const setTag = (tag) => {
    if (question.page.currentPage > 1) {
      dispatch(resetPagination());
    }

    dispatch(setKeyword(tag));
  };

  return (
    <div className="trending">
      <div className="trending__title">Trending</div>

      <div className="trending__list">
        {tag.api.getTagList.loaded &&
          tag.list.length > 0 &&
          tag.list.map((tag, index) => (
            <div
              onClick={() => setTag(tag)}
              key={index}
              className={clsx('trending__list-item', { 'trending__list-item--selected': tag === search.keyword })}
              role="button"
            >
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingTag;