import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @arg dateString String DateTime UTC.
* @desc Extracts Hour, Minutes of a provided DateTime String.
* @returns String with the extracted values of Hour, Minuites.
*/
export default (dateString: string): string => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  return moment(dateString).format('hh:mm A');
};
