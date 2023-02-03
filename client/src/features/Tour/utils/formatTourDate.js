const formatTourDate = (date) => {
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
  const formattedDay = day < 9 ? `0${day}` : day;

  return `${year}.${formattedMonth}.${formattedDay}`;
};

export default formatTourDate;
