'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WakaTime = require('./WakaTime');

Object.keys(_WakaTime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WakaTime[key];
    }
  });
});


Date.prototype.wakaTimeDateString = function () {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();
  return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]); // padding
};