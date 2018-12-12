import moment from 'moment-timezone';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Transforms the provided ISO DateTime (in Japan's TimeZone)
* and returns the equivalent in the current timezone.
* @arg String DateTime ISO String (in JST)
* @returns String DateTime ISO String (in Local TimeZone)
*/
export default (dateString) => {
  // Check if dateString arg is not valid
  if (!moment(dateString).isValid()) {
    throw new Error('Provided date string value, is not valid.');
  }

  // Transform provided DateTime String with to the Japan TimeZone
  const JSTDateTime = moment(dateString).tz('Japan');

  // Transform JST DateTime to UTC
  const JSTTimeToUTC = JSTDateTime.utc();

  // Transform UTC to the client's Time Zone equivalent
  return moment(JSTTimeToUTC.format()).tz(moment.tz.guess()).format();
};
