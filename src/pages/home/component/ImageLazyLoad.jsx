import React, {
  useState, useEffect, useRef
} from 'react';
import {
  useDispatch, useSelector
} from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';

import '@/pages/home/component/ImageLazyLoad.scss';

const ImageLazyLoad = (props) => {
  const imageRef = useRef(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const ref = imageRef.current;
    const options = { root: null };
    let observer = new IntersectionObserver(loadImage, options);

    observer.observe(ref);

    return () => {
      ref.removeEventListener('load', handleImageLoaded);
    };
  }, []);

  const handleImageLoaded = () => {
    setIsLoad(true);
  };

  const loadImage = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio) {
        if (imageRef.current !== null) {
          imageRef.current.addEventListener('load', handleImageLoaded);
          imageRef.current.src = props.imageSrc;
        }
      }
    });
  };

  return (
    <img
      ref={imageRef}
      className={clsx({ 'image-lazy-load-placeholder': !isLoad })}
    />
  );
};

export default ImageLazyLoad;