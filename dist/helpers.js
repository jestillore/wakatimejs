'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = serialize;
exports.getDateString = getDateString;
function serialize(obj) {
  return '?' + Object.keys(obj).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
}

function getDateString(date) {
  if (date instanceof Date) {
    return date.wakaTimeDateString();
  }
  return date;
}