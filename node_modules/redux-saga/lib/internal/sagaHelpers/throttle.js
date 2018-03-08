'use strict';

exports.__esModule = true;
exports.default = throttle;

var _fsmIterator = require('./fsmIterator');

var _fsmIterator2 = _interopRequireDefault(_fsmIterator);

var _io = require('../io');

var _channel = require('../channel');

var _buffers = require('../buffers');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: (0, _io.actionChannel)(pattern, _buffers.buffers.sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: (0, _io.take)(channel) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: (0, _io.call)(_utils.delay, delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return (0, _fsmIterator2.default)({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === _channel.END ? [_fsmIterator.qEnd] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + (0, _fsmIterator.safeName)(pattern) + ', ' + worker.name + ')');
}