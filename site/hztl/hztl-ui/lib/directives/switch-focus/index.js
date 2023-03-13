"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setFocus = _interopRequireDefault(require("./setFocus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var focusIndex = null;

function saveFocusData(focusElement, el) {
  var classList = focusElement.$el ? focusElement.$el.classList : focusElement.classList;
  el.value = _toConsumableArray(classList).find(function (item) {
    return item.match("focus-");
  });
}

function getAllFocusElementArray(el) {
  return _toConsumableArray(el.querySelectorAll(".switch-focus")).filter(function (el) {
    return !el.__vue__ || !el.__vue__.disabled;
  });
}

var _default = {
  inserted: function inserted(el, _ref) {
    var value = _ref.value;
    var initial = value.initial;

    if (initial) {
      var allFocusElementArray = getAllFocusElementArray(el);
      var focusElement = el.querySelector(".switch-focus.".concat(initial));

      if (focusElement) {
        saveFocusData(focusElement, el);
        (0, _setFocus["default"])(focusElement);
        focusIndex = allFocusElementArray.indexOf(focusElement);
      }
    }

    el.addEventListener("focus", function (event) {
      // 兼容处理
      var path = event.path || event.composedPath && event.composedPath(); // 获取非disabled的focus

      var allFocusElementArray = getAllFocusElementArray(el);
      path.forEach(function (element) {
        if (element.className && element.className.includes("switch-focus")) {
          focusIndex = allFocusElementArray.indexOf(element);
          saveFocusData(element, el);
        }
      });
    }, true);
  },
  update: function update(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue;
    var type = value.type,
        updateIndex = value.updateIndex,
        initial = value.initial;
    var oldUpdateIndex = oldValue.updateIndex;

    if (updateIndex !== oldUpdateIndex) {
      if (!type) {
        if (!initial) {
          var curFocusElement = el.querySelector(":focus");

          if (curFocusElement) {
            curFocusElement.blur();
          }
        } else {
          var focusElement = el.querySelector(".switch-focus.".concat(initial));
          var allFocusElementArray = getAllFocusElementArray(el);

          if (focusElement) {
            saveFocusData(focusElement, el);
            (0, _setFocus["default"])(focusElement);
            focusIndex = allFocusElementArray.indexOf(focusElement);
          }
        }
      } else {
        var _allFocusElementArray = getAllFocusElementArray(el);

        switch (type) {
          case "up":
            focusIndex--;

            if (!_allFocusElementArray[focusIndex]) {
              focusIndex = _allFocusElementArray.length - 1;
            }

            break;

          case "down":
            focusIndex++;

            if (!_allFocusElementArray[focusIndex]) {
              focusIndex = 0;
            }

            break;

          case "keep":
            focusIndex = _allFocusElementArray.indexOf(el.querySelector(".".concat(el.value))) || 0;
            break;

          default:
        }

        var _curFocusElement = _allFocusElementArray[focusIndex];
        saveFocusData(_curFocusElement, el);
        (0, _setFocus["default"])(_curFocusElement);
      }
    }
  }
};
exports["default"] = _default;