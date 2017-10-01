"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = "/Users/Flaque/Projects/react-mutate/examples/simple/pages/index.js?entry";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMutate = require("react-mutate");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _index = require("../mutations/with-caption/index.js");

var _index2 = _interopRequireDefault(_index);

var _PreviewImage = require("../components/PreviewImage.js");

var _PreviewImage2 = _interopRequireDefault(_PreviewImage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var MutatedPreviewImage = (0, _reactMutate.mutate)(_PreviewImage2.default, {
  PreviewImage: _index2.default
});

exports.default = function () {
  return _react2.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement(MutatedPreviewImage, { src: "https://media.giphy.com/media/Z3aQVJ78mmLyo/giphy-downsized-large.gif", __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIk11dGF0ZWRQcmV2aWV3SW1hZ2UiLCJQcmV2aWV3SW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNO3dCQUFOLEFBQTRCLEFBQXFCO0FBQUEsQUFDL0MsQ0FEMEI7O2tCQUliLFlBQUE7eUJBQ2IsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxnQ0FDRSxBQUFDLHVCQUFvQixLQUFyQixBQUF5QjtnQkFBekI7a0JBRlcsQUFDYixBQUNFO0FBQUE7O0EiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL0ZsYXF1ZS9Qcm9qZWN0cy9yZWFjdC1tdXRhdGUvZXhhbXBsZXMvc2ltcGxlIn0=