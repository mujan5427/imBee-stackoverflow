import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import clsx from 'clsx';
import _ from 'lodash';
import { useWindowHeight } from '@react-hook/window-size';

import Search from '@/pages/home/component/Search';
import Trending from '@/pages/home/component/Trending';
import ImageLazyLoad from '@/pages/home/component/ImageLazyLoad';
import InfiniteScrollingObserver from '@/pages/home/InfiniteScrollingObserver';

import '@/pages/home/component/Question.scss';

const QuestionCard = (props) => {
  const questionId = props.questionId;
  const question = useSelector((state) => state.question);

  const openQuestion = (questionId) => {
    window.open(`https://stackoverflow.com/questions/${questionId}`, '_blank');
  };

  return (
    <div
      onClick={() => openQuestion(questionId)}
      className="question-card"
    >
      <div className="question-card__description">
        <div className="question-card__description-title">{question.source[questionId].title}</div>
        <div className="question-card__description-analyze">
          <div className="question-card__score">
            <div className="question-card__score-title">Score</div>
            <div
              className={clsx('question-card__score-count', { 'question-card__score-count--poor': question.source[questionId].score < 0 })}
            >
              {question.source[questionId].score}
            </div>
          </div>
          <div className="question-card__answer">
            <div className="question-card__answer-title">Answers</div>
            <div
              className={clsx('question-card__answer-count', {
                'question-card__answer-count--good':
                  question.source[questionId].answer_count > 0 && !question.source[questionId].is_answered,
                'question-card__answer-count--great':
                  question.source[questionId].answer_count > 0 && !question.source[questionId].is_answered
              })}
            >
              {question.source[questionId].answer_count}
            </div>
          </div>
          <div className="question-card__view">
            <div className="question-card__view-title">Viewed</div>
            <div className="question-card__view-count">{question.source[questionId].view_count}</div>
          </div>
        </div>
      </div>
      <div className="question-card__user">
        <div className="question-card__user-image">
          <ImageLazyLoad imageSrc={question.source[questionId].owner.image} />
        </div>

        <div className="question-card__user-name">{question.source[questionId].owner.name}</div>
      </div>
    </div>
  );
};

const SearchMemo = React.memo(Search);
const TrendingMemo = React.memo(Trending);

const Question = () => {
  const dispatch = useDispatch();
  const viewPortHeight = useWindowHeight();
  const search = useSelector((state) => state.search);
  const question = useSelector((state) => state.question);

  const itemCount = question.list.length;
  const itemHeight = 111;
  const windowHeight = viewPortHeight;
  const [items, setItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);

  const infiniteScrollingObserverCount = 1;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(itemCount - 1, Math.floor((scrollTop + windowHeight) / itemHeight)) + infiniteScrollingObserverCount;

  useEffect(() => {
    const itemsPayload = [];

    if (question.api.getQuestion.loaded && question.list.length > 0 && !!search.keyword) {
      for (let i = startIndex; i <= endIndex; i++) {
        const questionId = question.list[i];

        if (i !== endIndex) {
          itemsPayload.push(<QuestionCard
            key={questionId}
            questionId={questionId}
          />);
        } else {
          itemsPayload.push(<InfiniteScrollingObserver key="InfiniteScrollingObserver" />);
        }
      }

      setItems([...itemsPayload]);
    }
  }, [
    startIndex,
    endIndex,
    search.keyword
  ]);

  useEffect(() => {
    setPaddingTop(startIndex * itemHeight);
  }, [startIndex]);

  const handleScroll = (e) => {
    if (e.currentTarget !== null) {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="question"
    >
      <SearchMemo />
      <TrendingMemo />
      {question.api.getQuestion.loaded && question.list.length === 0 && <div className="question__not-found">not found</div>}

      {question.api.getQuestion.loaded && question.list.length > 0 && (
        <div
          className="inner"
          style={{ paddingTop: `${paddingTop}px` }}
        >
          {items}
        </div>
      )}
    </div>
  );
};

export default Question;