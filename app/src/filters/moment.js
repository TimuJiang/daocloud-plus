import moment from 'moment';

module.exports = (value) => {
  moment.locale('zh-cn');
  if (Number.isInteger(value)) {
    return moment.unix(value).fromNow();
  }
  return moment(value, 'YYYY-MM-DDThh:mm:ss').fromNow();
};
