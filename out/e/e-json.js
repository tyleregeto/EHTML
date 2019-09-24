'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('@page-libs/cutie'),
    browserified = _require.browserified;

var _browserified = browserified(require('@cuties/object')),
    CreatedOptions = _browserified.CreatedOptions;

var _browserified2 = browserified(require('@cuties/json')),
    ParsedJSON = _browserified2.ParsedJSON;

var _browserified3 = browserified(require('@cuties/buffer')),
    StringFromBuffer = _browserified3.StringFromBuffer;

var _require2 = require('@page-libs/ajax'),
    ResponseFromAjaxRequest = _require2.ResponseFromAjaxRequest,
    ResponseBody = _require2.ResponseBody;

var AppliedActionsOnResponse = require('./../async/AppliedActionsOnResponse');

var ParsedElmSelectors = require('./../util/ParsedElmSelectors');

var E = require('./../E');

var EJSON =
/*#__PURE__*/
function (_E) {
  _inherits(EJSON, _E);

  function EJSON() {
    _classCallCheck(this, EJSON);

    return _possibleConstructorReturn(this, _getPrototypeOf(EJSON).call(this));
  }

  _createClass(EJSON, [{
    key: "onRender",
    value: function onRender() {
      var event = this.getAttribute('data-event');
      this.progressBar = new ParsedElmSelectors(this.getAttribute('data-progress-bar')).value()[0];
      this.prepareProgressBar(this.progressBar);

      if (event) {
        this.addEventListener(event, this.activate);
      } else {
        this.activate();
      }
    }
  }, {
    key: "activate",
    value: function activate() {
      new AppliedActionsOnResponse(this.tagName, this.getAttribute('data-response-object-name'), this.getAttribute('data-actions-on-response'), new ParsedJSON(new StringFromBuffer(new ResponseBody(new ResponseFromAjaxRequest(new CreatedOptions('url', this.getAttribute('data-src'), 'method', 'GET', 'headers', new ParsedJSON(this.getAttribute('data-headers') || '{}'), 'progressEvent', this.showProgress(this.progressBar))))))).call();
    }
  }, {
    key: "prepareProgressBar",
    value: function prepareProgressBar(progressBar) {
      if (progressBar) {
        progressBar.max = 100;
        progressBar.value = 0;
        progressBar.style.display = 'none';
      }
    }
  }, {
    key: "showProgress",
    value: function showProgress(progressBar) {
      if (progressBar) {
        return function (event) {
          if (event.lengthComputable) {
            progressBar.style.display = '';
            var percentComplete = parseInt(event.loaded / event.total * 100);
            progressBar.value = percentComplete;

            if (progressBar.value === 100) {
              progressBar.style.display = 'none';
            }
          }
        };
      }

      return function () {};
    }
  }]);

  return EJSON;
}(E);

window.customElements.define('e-json', EJSON);
module.exports = EJSON;
