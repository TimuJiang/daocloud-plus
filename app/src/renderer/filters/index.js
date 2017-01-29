import Vue from 'vue';
import moment from 'moment';

Vue.filter('moment', (value) => {
  moment.locale('zh-cn');
  if (Number.isInteger(value)) {
    return moment.unix(value).fromNow();
  }
  return moment(value, 'YYYY-MM-DDThh:mm:ss').fromNow();
});
