const moment = require('moment');

const convertDate = date => moment(date).format('dddd, DD MMM YYYY, HH:mm');

module.exports = { convertDate };
