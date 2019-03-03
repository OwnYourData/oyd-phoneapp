'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsocketTransport = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = createChannel;

var _global = require('global');

var _channels = require('@storybook/channels');

var _channels2 = _interopRequireDefault(_channels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */

var logger = console;

var WebsocketTransport = exports.WebsocketTransport = function () {
  function WebsocketTransport(_ref) {
    var url = _ref.url;
    (0, _classCallCheck3.default)(this, WebsocketTransport);

    this._socket = null;
    this._buffer = [];
    this._handler = null;
    this._isReady = false;
    this._connect(url);
  }

  (0, _createClass3.default)(WebsocketTransport, [{
    key: 'setHandler',
    value: function setHandler(handler) {
      this._handler = handler;
    }
  }, {
    key: 'send',
    value: function send(event) {
      if (!this._isReady) {
        this._sendLater(event);
      } else {
        this._sendNow(event);
      }
    }
  }, {
    key: '_sendLater',
    value: function _sendLater(event) {
      this._buffer.push(event);
    }
  }, {
    key: '_sendNow',
    value: function _sendNow(event) {
      var data = (0, _stringify2.default)(event);
      this._socket.send(data);
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var _this = this;

      var buffer = this._buffer;
      this._buffer = [];
      buffer.forEach(function (event) {
        return _this.send(event);
      });
    }
  }, {
    key: '_connect',
    value: function _connect(url) {
      var _this2 = this;

      this._socket = new _global.WebSocket(url);
      this._socket.onopen = function () {
        _this2._isReady = true;
        _this2._flush();
      };
      this._socket.onmessage = function (e) {
        var event = JSON.parse(e.data);
        _this2._handler(event);
      };
      this._socket.onerror = function (e) {
        logger.error('websocket: connection error', e.message);
      };
      this._socket.onclose = function (e) {
        logger.error('websocket: connection closed', e.code, e.reason);
      };
    }
  }]);
  return WebsocketTransport;
}();

function createChannel(_ref2) {
  var url = _ref2.url;

  var transport = new WebsocketTransport({ url: url });
  return new _channels2.default({ transport: transport });
}