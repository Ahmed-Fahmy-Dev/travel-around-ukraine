import React, { memo } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { motion } from 'framer-motion';

const UkraineTextInfo = styled((props) => <Typography {...props} />)(({ theme }) => ({
  [theme.breakpoints.up('tablet')]: {
    padding: '10px',
  },

  [theme.breakpoints.up('laptop')]: {
    padding: '20px',
  },
}));

const AboutUkraineContainer = styled((props) => <Box {...props} />)(({ theme }) => ({
  backgroundColor: '#EDEDED',
  borderRadius: '20px',
  zIndex: 1,
  transition: '2s',
  position: 'absolute',
  top: '12%',
  left: '40%',
  width: '200px',
  marginRight: '30px',
  padding: '20px',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    animation: `
        webkitTransform: translateX(-60px);
        transform: translateX(-60px);`,
    boxShadow:
      '1px 1px #ededed, 2px 2px #ededed, 3px 3px #ededed, 4px 4px #ededed, 5px 5px #ededed, 6px 6px #ededed,  7px 7px #ededed',
  },

  '&:hover h2': {
    color: theme.palette.secondary.main,
  },

  [theme.breakpoints.up('tablet')]: {
    top: '15%',
    width: '400px',
    left: '52%',
    padding: '25px',
  },

  [theme.breakpoints.up('laptop')]: {
    top: '20%',
    left: '55%',
    width: '600px',
    padding: '30px',
  },
}));

const UkraineBackground = styled((props) => <Box {...props} />)(({ theme }) => ({
  height: 749,
  backgroundImage: `url(${'./assets/images/imgAboutUkraineSection/ukraine.jpeg'})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '20px',
  objectFit: 'cover',
  marginRight: '124px',

  [theme.breakpoints.up('tablet')]: {
    marginRight: '264px',
  },

  [theme.breakpoints.up('laptop')]: {
    marginRight: '369px',
  },
}));

const blockAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const AboutUkraine = () => (
  <motion.div initial="hidden" viewport={{ amount: 0.3 }} whileInView="visible" variants={blockAnimation}>
    <UkraineBackground sx={{ position: 'relative' }}>
      <AboutUkraineContainer>
        <Typography variant="h2" sx={{ transition: '2s' }}>
          What is Ukraine?
        </Typography>
        <UkraineTextInfo>
          You are going to explore the largest country in Europe – a picturesque place where innovative creativity meets
          ancient traditions, and wonderful legends come into reality. Upon the road you will come to know lots of brave
          and kind-hearted people. They are fighting for freedom and dignity. They are searching for peace and
          prosperity. They are transforming Ukraine into a modern country, unique business hub and new all-season
          tourist destination.
        </UkraineTextInfo>
        <UkraineTextInfo>
          Now get closer. The time has come to unlock the great and still less than fully realized potential of Ukraine.
          It is our time. And it starts right NOW. So, you’ve got the answer to the question ‘What is Ukraine?’…
          Welcome, and don’t forget to take a big backpack for some great memories with you!
        </UkraineTextInfo>
      </AboutUkraineContainer>
    </UkraineBackground>
  </motion.div>
);

export default memo(AboutUkraine);
