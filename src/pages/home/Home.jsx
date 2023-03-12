import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import '@/pages/home/Home.scss';

import Question from '@/pages/home/component/Question';

import { getTagList } from '@/store/slices/tag';

const useStyles = makeStyles((theme) => ({ backdrop: {
  zIndex: theme.zIndex.drawer + 1,
  color: '#ffffff'
} }));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tagListPayload = { params: {
      pagesize: 10,
      site: 'stackoverflow'
    } };

    // avoiding race condition
    localStorage.clear();
    dispatch(getTagList(tagListPayload));
  }, []);

  useEffect(() => {
    if (question.api.getQuestion.loading) {
      handleOpen();
    }

    if (question.api.getQuestion.loaded || question.api.getQuestion.error) {
      handleClose();
    }
  }, [question.api.getQuestion]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Question />

      <Backdrop
        open={open}
        className={classes.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Home;