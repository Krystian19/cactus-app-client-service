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

  // Parses full date and full time ignoring the timezone.
  // (it's a bad practice, but it works).
  const parsedString = `${dateString.substring(0, 10)} ${dateString.substr(11, 8)}`;

  const parsedDateTime = moment(parsedString);

  // Transform UTC time into the Tokyo timezone
  const tokyoTime = parsedDateTime.tz('Asia/Tokyo').format();

  // Parse Tokyo DateTime String into the local timezone
  return moment(tokyoTime).tz(moment.tz.guess())
    .format();
};
