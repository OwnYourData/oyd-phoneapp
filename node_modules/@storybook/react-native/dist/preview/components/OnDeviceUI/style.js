'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reactNativeCompat = require('react-native-compat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  icon: {
    width: 30,
    height: 30
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black'
  },
  menuContainer: (0, _extends3.default)({}, _reactNativeCompat.StyleSheet.absoluteFillObject, {
    right: null,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }),
  previewContainer: {
    flex: 1
  },
  previewWrapper: {
    flex: 1
  },
  closeButton: {
    marginVertical: 10
  },
  preview: (0, _extends3.default)({}, _reactNativeCompat.StyleSheet.absoluteFillObject)
};