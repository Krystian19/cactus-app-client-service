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

  // // Debug time conversion when necessary
  // const TokyoTime = moment
  //   .tz(dateString, 'Asia/Tokyo').format('YYYY-MM-DD hh:mm:ss A');
  // console.log(`Original time: ${dateString}`);
  // console.log(`Japanese original time:
  // ${TokyoTime}`);

  // Translate provided UTC time into the local time
  return moment.tz(dateString, moment.tz.guess()).format();
};
