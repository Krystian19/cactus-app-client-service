import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @arg dateString String DateTime UTC
* @desc Returns a String containing the full year of the provided date
* in the MMM YYYY format
* @returns String Containing full year
*/
export default (dateString: string): string => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  return moment(dateString).format('YYYY');
};
