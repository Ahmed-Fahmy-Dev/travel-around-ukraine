const scrollToTop = (transition) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: transition,
  });
};

export default scrollToTop;
