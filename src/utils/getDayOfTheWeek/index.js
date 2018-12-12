import moment from 'moment';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Returns the current day of the week as an integer
* @returns Integer Day of the week. E.g: 1 for monday, 7 for sunday, etc ...
*/
export default () => moment().isoWeekday();
