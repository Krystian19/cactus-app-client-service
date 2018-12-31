import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Returns the current day of the week as an integer
* @returns Integer Day of the week. E.g: 1 for monday, 7 for sunday, etc ...
*/
export default (dateString) => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  return moment(dateString).format('hh:mm A');
};
