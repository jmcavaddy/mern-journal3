const moment = require('moment');

function dateFormat(date) {
  return moment(date).format('MMMM Do, YYYY [at] h:mm a');
};

module.exports = dateFormat;