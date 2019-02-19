import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @arg dateString String DateTime UTC
* @desc Returns a String containing the month and the year of the provided date
* in the MMM YYYY format
* @returns String Containing month and year
*/
export default (dateString: String):String => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  return moment(dateString).format('MMM YYYY');
};
