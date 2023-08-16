const moment = require('moment');

function dateFormat(date) {
  return moment(date).format('MM-DD-YYYY [at] h:mm a');
};

module.exports = dateFormat;