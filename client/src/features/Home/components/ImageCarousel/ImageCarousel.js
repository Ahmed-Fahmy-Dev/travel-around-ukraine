/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, memo } from 'react';

import Carousel from 'react-material-ui-carousel';

const ImageCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('./heroSectionImages.json').then((res) => res.json());
      setImages(data);
    })();
  }, []);

  return (
    <Carousel
      height="100vh"
      interval={6500}
      duration={2500}
      stopAutoPlayOnHover={false}
      navButtonsAlwaysInvisible
      indicators={false}
    >
      {images.map((url) => (
        <img src={url} alt="Ukraine" key={url} />
      ))}
    </Carousel>
  );
};

export default memo(ImageCarousel);
