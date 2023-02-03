/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './Swiper.scss';

import { Autoplay, FreeMode, Mousewheel, Scrollbar, Zoom, Thumbs, Navigation } from 'swiper';

import { SliderButton } from '../../../../components';

export default function ImageGallery({ imageUrls }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function disableScroll() {
    document.body.classList.add('stop-scrolling');
  }
  function enableScroll() {
    document.body.classList.remove('stop-scrolling');
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
    disableScroll();
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    enableScroll();
  };

  // to return a preloader in the future
  if (!imageUrls) return null;

  return (
    <div className="c">
      <SliderButton id="p" position={{ top: '40%', left: '-30px', rotate: '180deg' }} />
      <SliderButton id="n" position={{ top: '40%', right: '-30px' }} />
      <Swiper
        spaceBetween={5}
        zoom
        loop
        longSwipes
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        watchSlidesProgress
        navigation={{
          nextEl: '#n',
          prevEl: '#p',
        }}
        mousewheel
        modules={[Autoplay, Mousewheel, FreeMode, Scrollbar, Zoom, Navigation, Thumbs]}
        slidesPerView="auto"
        className="mySwiper2"
      >
        {imageUrls.map((src, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={`${src + index}`}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <img src={src} alt="" onClick={() => openImageViewer(index)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        style={{
          height: '70px',
          width: 'auto',
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView="auto"
        watchSlidesProgress
        modules={[Navigation, Thumbs]}
        className="thumbsSwiper"
      >
        {imageUrls.map((src, i) => (
          <SwiperSlide key={`${src + i}`}>
            <img src={src} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={imageUrls}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 10,
          }}
          closeOnClickOutside
        />
      )}
    </div>
  );
}
