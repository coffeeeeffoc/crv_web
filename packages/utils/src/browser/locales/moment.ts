import moment from 'moment';

export const meridiem = (hour: number, minute: number, isLower: boolean) => {
  const hm = hour * 100 + minute;
  if (hm < 100 || hm >= 2300) {
    return '半夜';
  } else if (hm < 500) {
    return '凌晨';
  } else if (hm < 700) {
    return '清晨';
  } else if (hm < 900) {
    return '早上';
  } else if (hm < 1130) {
    return '上午';
  } else if (hm < 1300) {
    return '中午';
  } else if (hm < 1700) {
    return '下午';
  } else if (hm < 1800) {
    return '傍晚';
  } else {
    return '晚上';
  }
};

moment.updateLocale('zh-cn', { meridiem });
