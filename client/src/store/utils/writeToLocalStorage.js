const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default writeToLocalStorage;
