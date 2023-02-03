import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Typography, styled, Container } from '@mui/material';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { fetchPopularProducts } from '../../../../store/slices/catalogueSlice/catalogueSlice';
import { CardItem } from '..';
import { SliderButton } from '../../../../components';

import 'swiper/swiper.min.css';

const CardContainerHeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px',
});

const CardContainerSwiperContainer = styled('div')({
  position: 'relative',
  margin: '10px auto 0 auto',

  '@media (min-width: 300px)': {
    width: '265px',
  },

  '@media (min-width: 768px)': {
    width: '560px',
  },

  '@media (min-width: 1024px)': {
    width: '855px',
  },

  '@media (min-width: 1360px)': {
    width: '1150px',
  },
});

const CardContainer = () => {
  const dispatch = useDispatch();
  const popularProducts = useSelector((state) => state.catalogue.popular, shallowEqual);

  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, []);

  return (
    <Container>
      <CardContainerHeaderContainer>
        <Typography variant="h2" sx={{ marginBottom: '0px' }}>
          Popular tours
        </Typography>
        <Link to="/catalogue">
          <Typography>View All</Typography>
        </Link>
      </CardContainerHeaderContainer>
      <CardContainerSwiperContainer>
        <SliderButton id="previous" position={{ top: '44%', left: '-30px', rotate: '180deg' }} />
        <SliderButton id="next" position={{ top: '44%', right: '-30px' }} />
        <Swiper
          breakpoints={{
            265: {
              width: 265,
              slidesPerView: 1,
            },
            768: {
              width: 560,
              slidesPerView: 2,
            },
            1024: {
              width: 855,
              slidesPerView: 3,
            },
            1360: {
              width: 1150,
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          slidesPerGroup={1}
          loop
          loopFillGroupWithBlank
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: '#next',
            prevEl: '#previous',
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {popularProducts.length &&
            popularProducts.map(({ name, region, _id, imageUrls, currentPrice, itemNo }) => (
              <SwiperSlide key={_id}>
                <CardItem
                  name={name}
                  region={region}
                  id={_id}
                  imageUrls={imageUrls}
                  currentPrice={currentPrice}
                  itemNo={itemNo}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </CardContainerSwiperContainer>
    </Container>
  );
};

export default memo(CardContainer);
