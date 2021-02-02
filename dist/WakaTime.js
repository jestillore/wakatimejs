'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WakaTime = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _axios = require('axios');

var axios = _interopRequireWildcard(_axios);

var _helpers = require('./helpers');

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WakaTime = exports.WakaTime = function () {
  function WakaTime(apiKey) {
    _classCallCheck(this, WakaTime);

    this.apiKey = apiKey;
  }

  _createClass(WakaTime, [{
    key: 'getApiOptions',
    value: function getApiOptions(path, query) {
      var qs = query ? (0, _helpers.serialize)(query) : '';
      return {
        url: _constants.BASE_URL + path + qs,
        headers: {
          'Authorization': 'Basic ' + (0, _btoa2.default)(this.apiKey)
        }
      };
    }
  }, {
    key: 'currentUser',
    value: async function currentUser() {
//       console.log(this.getApiOptions('/users/current'));

      var _getApiOptions = this.getApiOptions('/users/current'),
          url = _getApiOptions.url,
          headers = _getApiOptions.headers;

//       console.log(url, headers);
      return (await axios.get(url, { headers: headers })).data;
    }
  }, {
    key: 'stats',
    value: async function stats() {
      var stat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'last_7_days';

      var validRanges = ['last_7_days', 'last_30_days', 'last_6_months', 'last_year', 'all_time'];
      if (!validRanges.includes(stat)) {
        return new Error('Invalid stat parameter');
      }

      var _getApiOptions2 = this.getApiOptions('/users/current/stats/' + stat),
          url = _getApiOptions2.url,
          headers = _getApiOptions2.headers;

      return (await axios.get(url, { headers: headers })).data;
    }
  }, {
    key: 'summaries',
    value: async function summaries(object) {
      var start = '';
      var end = '';

      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && !(object instanceof Date)) {
        start = (0, _helpers.getDateString)(object.start);
        end = (0, _helpers.getDateString)(object.end);
      } else {
        start = (0, _helpers.getDateString)(object);
        end = (0, _helpers.getDateString)(object);
      }

      var _getApiOptions3 = this.getApiOptions('/users/current/summaries', {
        start: start,
        end: end
      }),
          url = _getApiOptions3.url,
          headers = _getApiOptions3.headers;

      return (await axios.get(url, { headers: headers })).data;
    }
  }, {
    key: 'durations',
    value: async function durations(date) {
      var _getApiOptions4 = this.getApiOptions('/users/current/durations', {
        date: (0, _helpers.getDateString)(date)
      }),
          url = _getApiOptions4.url,
          headers = _getApiOptions4.headers;

      return (await axios.get(url, { headers: headers })).data;
    }
  }]);

  return WakaTime;
}();
