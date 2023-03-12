import React, {
  useState, useEffect, useRef
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';

import moment from 'moment';
import clsx from 'clsx';

import '@/pages/home/InfiniteScrollingObserver.scss';

import { fetchData } from '@/store/slices/question';

const InfiniteScrollingObserver = (props) => {
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const pageRef = useRef(1);
  const search = useSelector((state) => state.search);
  const question = useSelector((state) => state.question);

  useEffect(() => {
    const options = { root: null };
    let observer = new IntersectionObserver(loadData, options);

    observer.observe(observerRef.current);
  }, []);

  useEffect(() => {
    if (question.page.currentPage > 1 && question.page.hasNextPage) {
      pageRef.current = question.page.currentPage;
    }
  }, [question.page.currentPage]);

  const loadData = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio && question.page.hasNextPage) {
        const payload = { params: {
          page: pageRef.current,
          pagesize: 20,
          order: 'desc',
          site: 'stackoverflow',
          tagged: search.keyword,
          filter: 'default'
        } };

        // avoiding race condition
        const cacheKey = `${payload.params.page}_${payload.params.tagged}`;

        if (localStorage.getItem(cacheKey) === null) {
          localStorage.setItem(cacheKey, 'true');
          dispatch(fetchData(payload));
        }
      }
    });
  };

  return (
    <div
      ref={observerRef}
      className="infinite-scrolling-observer"
    >
      <Box
        display="flex"
        width="100%"
      >
        <Box width="100%">
          <Skeleton
            variant="text"
            width="100%"
          />
          <Box
            display="flex"
            justifyContent="space-around"
          >
            <Skeleton
              variant="rect"
              width="72px"
            />
            <Skeleton
              variant="rect"
              width="72px"
            />
            <Skeleton
              variant="rect"
              width="72px"
            />
          </Box>
        </Box>
        <Box
          ml={1}
          width="80px"
        >
          <Skeleton
            variant="circle"
            width="80px"
            height="80px"
          >
            <Avatar />
          </Skeleton>
          <Skeleton
            variant="text"
            width="100%"
          />
        </Box>
      </Box>
    </div>
  );
};

export default InfiniteScrollingObserver;