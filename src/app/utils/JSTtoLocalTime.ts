import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Transforms the provided UTC DateTime (Original Japan's TimeZone)
* and returns the equivalent in the current timezone.
* @arg dateString String DateTime UTC String
* @returns String DateTime ISO String (in Local TimeZone)
*/
export default (dateString: String): String => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  // Translate provided UTC time into the local time
  return moment.tz(dateString, moment.tz.guess()).format();
};
