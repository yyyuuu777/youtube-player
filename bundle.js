/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by ly on 11/2/2017 AD.
 */
var SvgUtil = function () {
    function SvgUtil(_ref) {
        var _iconEls, _statesObj;

        var video = _ref.video,
            states = _ref.states,
            svgWrapClass = _ref.svgWrapClass,
            useDomId = _ref.useDomId,
            svgId = _ref.svgId,
            snapAnimation = _ref.snapAnimation;

        _classCallCheck(this, SvgUtil);

        // 用一个对象接收岂不更好 如 this.a = {}
        this.video = video;
        this.states = states;
        this.svgWrapClass = svgWrapClass;
        this.svgId = svgId;
        this.useDomId = useDomId;
        this.snapAnimation = snapAnimation;
        this.el = document.querySelector(svgWrapClass);
        this.iconEls = (_iconEls = {}, _defineProperty(_iconEls, this.states[0].name, document.querySelector("#" + this.states[0].name)), _defineProperty(_iconEls, this.states[1].name, document.querySelector("#" + this.states[1].name)), _iconEls);
        this.statesObj = (_statesObj = {}, _defineProperty(_statesObj, this.states[0].name, this.states[1].name), _defineProperty(_statesObj, this.states[1].name, this.states[0].name), _statesObj);
    }

    _createClass(SvgUtil, [{
        key: "setInitialState",
        value: function setInitialState() {
            var initIconRef = this.el.querySelector('use').getAttribute("xlink:href");
            this.state = this.el.querySelector(initIconRef).getAttribute("data-state");
        }
    }, {
        key: "replaceUseEl",
        value: function replaceUseEl() {
            var path = Snap("#" + this.svgId).paper.path();
            var ele = document.getElementById(this.useDomId);
            ele.parentNode.removeChild(ele);
            Snap("#" + this.svgId).append(path);
            path.attr("class", "c_" + this.useDomId).attr("d", this.getStateIconPath());
        }
    }, {
        key: "toggle",
        value: function toggle() {
            var path = Snap.select(".c_" + this.useDomId);
            this.toNextState();
            path.animate({
                d: this.getStateIconPath()
            }, this.snapAnimation.time, this.snapAnimation.name);
        }
    }, {
        key: "toNextState",
        value: function toNextState() {
            var _this = this;

            this.state = this.state === 'max' ? this.statesObj['mute'] : this.state;
            this.state = this.statesObj[this.state];
            this.states.forEach(function (item) {
                Object.is(_this.state, item.name) && item.callBack.call(_this);
            });
        }
    }, {
        key: "getStateIconPath",
        value: function getStateIconPath() {
            return this.iconEls[this.state].getAttribute('d');
        }
    }, {
        key: "init",
        value: function init() {
            _init.call(this);
        }
    }]);

    return SvgUtil;
}();

// private method


function _init() {
    this.setInitialState();
    this.replaceUseEl();
    this.el.addEventListener("click", this.toggle.bind(this));
}

var VolumeSvgUtil = function (_SvgUtil) {
    _inherits(VolumeSvgUtil, _SvgUtil);

    function VolumeSvgUtil(param) {
        _classCallCheck(this, VolumeSvgUtil);

        var _this2 = _possibleConstructorReturn(this, (VolumeSvgUtil.__proto__ || Object.getPrototypeOf(VolumeSvgUtil)).call(this, param));

        _this2.statesObj['max'] = 'max';
        _this2.iconEls['max'] = document.querySelector('#max');
        return _this2;
    }

    _createClass(VolumeSvgUtil, [{
        key: "goMute",
        value: function goMute() {
            this.state = this.statesObj['med'];
            this.animate();
        }
    }, {
        key: "goMed",
        value: function goMed() {
            this.state = this.statesObj['mute'];
            this.animate();
        }
    }, {
        key: "goMax",
        value: function goMax() {
            this.state = this.statesObj['max'];
            this.animate();
        }
    }, {
        key: "replaceUseEl",
        value: function replaceUseEl() {
            _get(VolumeSvgUtil.prototype.__proto__ || Object.getPrototypeOf(VolumeSvgUtil.prototype), "replaceUseEl", this).call(this);
            this.path = Snap.select(".c_" + this.useDomId);
        }
    }, {
        key: "animate",
        value: function animate() {
            this.path.animate({
                d: this.getStateIconPath()
            }, this.snapAnimation.time, this.snapAnimation.name);
        }
    }]);

    return VolumeSvgUtil;
}(SvgUtil);

exports = module.exports = {};

module.exports.svg = {
    volumeSvgUtil: VolumeSvgUtil,
    svgUtil: SvgUtil
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ly on 11/2/2017 AD.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Config = __webpack_require__(8);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: 'getDom',
        value: function getDom(id) {
            if (id.includes('.')) {
                return document.getElementsByClassName(id.substring(1));
            }
            return document.getElementById(id);
        }
    }, {
        key: 'log',
        value: function log(str) {
            _Config2.default.debug && console.log(_Config2.default.num++ + '\uFF1AvideoPlayer--->', str);
        }
    }, {
        key: 'i',
        value: function i(str) {
            _Config2.default.debug && console.log(_Config2.default.num++ + ' special: ' + '-'.repeat(10) + '> str');
        }
    }, {
        key: 'generateDom',
        value: function generateDom() {
            return new Proxy({}, {
                get: function get(target, property) {
                    return function () {
                        var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        var el = document.createElement(property);
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = Object.keys(attrs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var prop = _step.value;

                                el.setAttribute(prop, attrs[prop]);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            children[_key - 1] = arguments[_key];
                        }

                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var child = _step2.value;

                                if (typeof child === 'string') {
                                    child = document.createTextNode(child);
                                }
                                el.appendChild(child);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        return el;
                    };
                }
            });
        }
    }, {
        key: 'addChildren',
        value: function addChildren(cur, target) {
            target.appendChild(cur);
        }
    }]);

    return Util;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by ly on 11/2/2017 AD.
 */
// todo:// css 打包和js 在一块  怎么导入js 和 css
// todo:// babel-core 作用
// todo:// es2015  ? npm install babel-preset-es2015 --save -dev 或 建立文件夹？
__webpack_require__(3);
var Util = __webpack_require__(1);
var Svg = __webpack_require__(0);
var VolumeSvgUtil = __webpack_require__(0).svg.volumeSvgUtil;
var SvgUtil = __webpack_require__(0).svg.svgUtil;
var Controller = __webpack_require__(9);
var util = new Util();

var QPlayer = {
    init: function init(video, src, isDash, qTheme) {
        video.src = src;
        if (isDash) {
            video.setAttribute('data-dashjs-player', '');
        }
        qTheme && useQplayer(video) || '';
    }
};
function useQplayer(video) {
    // todo:// set video lock
    var video_obj = new Controller(video);
    video_obj.init();

    // recalculate window
    window.addEventListener('resize', function () {
        video_obj.recalcute_dom();
    });

    var volumeButton = new VolumeSvgUtil({
        video: video,
        states: [{
            name: 'mute',
            callBack: function callBack() {
                this.video.volume = 0;
                video_obj.doms.ui_volume_inner.style.width = video_obj.doms.ui_volume_point.style.left = 0;
            }
        }, {
            name: 'med',
            callBack: function callBack() {
                video.volume = 10 / video_obj.doms.ui_volume_out.clientWidth;
                video_obj.doms.ui_volume_inner.style.width = video_obj.doms.ui_volume_point.style.left = '10px';
            }
        }],
        svgWrapClass: '.volume',
        useDomId: 'volume-btn-use',
        svgId: 'svg-volume',
        snapAnimation: {
            time: 200,
            name: mina.linear
        }
    });
    var playButton = new SvgUtil({
        video: video,
        states: [{
            name: 'paused',
            callBack: function callBack() {
                this.video.play();
            }
        }, {
            name: 'playing',
            callBack: function callBack() {
                this.video.pause();
            }
        }],
        svgWrapClass: '.js-button',
        useDomId: 'play-btn-use',
        svgId: 'svgicon',
        snapAnimation: {
            time: 200,
            name: mina.linear
        }
    });
    playButton.init();
    volumeButton.init();
    window.playButton = playButton;
    window.volumeButton = volumeButton;
}
var video = util.getDom('video');
// let videoUrl = "http://9890.vod.myqcloud.com/9890_9c1fa3e2aea011e59fc841df10c92278.f20.mp4"
var dashSrc = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
QPlayer.init(video, dashSrc, true, true);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "@keyframes video_status {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    transform: scale(2); } }\n\n.ytp-spinner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 64px;\n  margin-left: -32px;\n  z-index: 18;\n  pointer-events: none;\n  display: none; }\n\n.ytp-spinner-container {\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n  padding-bottom: 100%;\n  top: 50%;\n  left: 50%;\n  margin-top: -50%;\n  margin-left: -50%;\n  animation: ytp-spinner-linspin 1568.23529647ms linear infinite;\n  -webkit-animation: ytp-spinner-linspin 1568.23529647ms linear infinite; }\n\n.ytp-spinner-left {\n  right: 49%; }\n\n.ytp-spinner-left {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  overflow: hidden; }\n\n.ytp-spinner-right {\n  left: 49%; }\n\n.ytp-spinner-right {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n\n.ytp-spinner-right .ytp-spinner-circle {\n  left: -100%;\n  border-left-color: transparent;\n  -webkit-animation: ytp-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.ytp-spinner-left .ytp-spinner-circle {\n  border-right-color: transparent;\n  -webkit-animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.ytp-spinner-circle {\n  box-sizing: border-box;\n  position: absolute;\n  width: 200%;\n  height: 100%;\n  border-style: solid;\n  border-color: #ddd #ddd transparent;\n  border-radius: 50%;\n  border-width: 6px; }\n\n.ytp-spinner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 64px;\n  margin-left: -32px;\n  z-index: 18;\n  pointer-events: none; }\n\n@keyframes ytp-right-spin {\n  0% {\n    transform: rotate(-130deg); }\n  50% {\n    transform: rotate(5deg); }\n  100% {\n    transform: rotate(-130deg); } }\n\n@keyframes ytp-spinner-easespin {\n  12.5% {\n    transform: rotate(135deg); }\n  25% {\n    transform: rotate(270deg); }\n  37.5% {\n    transform: rotate(405deg); }\n  50% {\n    transform: rotate(540deg); }\n  62.5% {\n    transform: rotate(675deg); }\n  75% {\n    transform: rotate(810deg); }\n  87.5% {\n    transform: rotate(945deg); }\n  100% {\n    transform: rotate(1080deg); } }\n\n@keyframes ytp-spinner-left-spin {\n  0% {\n    transform: rotate(130deg); }\n  50% {\n    transform: rotate(-5deg); }\n  100% {\n    transform: rotate(130deg); } }\n\n.ytp-spinner-rotator {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@keyframes ytp-spinner-linspin {\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes video_status {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    transform: scale(2); } }\n\n.ytp-spinner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 64px;\n  margin-left: -32px;\n  z-index: 18;\n  pointer-events: none;\n  display: none; }\n\n.ytp-spinner-container {\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n  padding-bottom: 100%;\n  top: 50%;\n  left: 50%;\n  margin-top: -50%;\n  margin-left: -50%;\n  animation: ytp-spinner-linspin 1568.23529647ms linear infinite;\n  -webkit-animation: ytp-spinner-linspin 1568.23529647ms linear infinite; }\n\n.ytp-spinner-left {\n  right: 49%; }\n\n.ytp-spinner-left {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  overflow: hidden; }\n\n.ytp-spinner-right {\n  left: 49%; }\n\n.ytp-spinner-right {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n\n.ytp-spinner-right .ytp-spinner-circle {\n  left: -100%;\n  border-left-color: transparent;\n  -webkit-animation: ytp-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.ytp-spinner-left .ytp-spinner-circle {\n  border-right-color: transparent;\n  -webkit-animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-spinner-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.ytp-spinner-circle {\n  box-sizing: border-box;\n  position: absolute;\n  width: 200%;\n  height: 100%;\n  border-style: solid;\n  border-color: #ddd #ddd transparent;\n  border-radius: 50%;\n  border-width: 6px; }\n\n.ytp-spinner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 64px;\n  margin-left: -32px;\n  z-index: 18;\n  pointer-events: none; }\n\n@keyframes ytp-right-spin {\n  0% {\n    transform: rotate(-130deg); }\n  50% {\n    transform: rotate(5deg); }\n  100% {\n    transform: rotate(-130deg); } }\n\n@keyframes ytp-spinner-easespin {\n  12.5% {\n    transform: rotate(135deg); }\n  25% {\n    transform: rotate(270deg); }\n  37.5% {\n    transform: rotate(405deg); }\n  50% {\n    transform: rotate(540deg); }\n  62.5% {\n    transform: rotate(675deg); }\n  75% {\n    transform: rotate(810deg); }\n  87.5% {\n    transform: rotate(945deg); }\n  100% {\n    transform: rotate(1080deg); } }\n\n@keyframes ytp-spinner-left-spin {\n  0% {\n    transform: rotate(130deg); }\n  50% {\n    transform: rotate(-5deg); }\n  100% {\n    transform: rotate(130deg); } }\n\n.ytp-spinner-rotator {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: ytp-spinner-easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@keyframes ytp-spinner-linspin {\n  100% {\n    transform: rotate(360deg); } }\n\nhtml, body, * {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box; }\n\ni, em, strong {\n  font-style: normal; }\n\nbutton {\n  background: none;\n  border: none;\n  outline: none; }\n\nbutton:active, button:focus {\n  border: none; }\n\nli {\n  list-style: none; }\n\n.video {\n  min-height: 200px;\n  min-width: 200px;\n  width: 80%;\n  background: #000;\n  overflow: hidden;\n  position: relative; }\n  .video .video-status-btn {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: auto;\n    padding: 5px;\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    opacity: 0;\n    z-index: 1000;\n    background-color: rgba(0, 0, 0, 0.5); }\n    .video .video-status-btn svg {\n      display: none; }\n  .video video {\n    width: 100%; }\n\n.control {\n  position: absolute;\n  bottom: 1px;\n  z-index: 1000;\n  width: 100%;\n  transition: all 0.7s;\n  background-color: transparent; }\n  .control .progress-visual-hover {\n    height: 16px;\n    width: 100%;\n    position: relative; }\n    .control .progress-visual-hover:hover {\n      cursor: pointer; }\n  .control:hover {\n    cursor: pointer; }\n  .control:hover .progress {\n    transform: scaleY(1.5);\n    box-sizing: border-box; }\n  .control:hover .point {\n    opacity: 1 !important;\n    transform: scaleY(0.67); }\n  .control .progress {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 99%;\n    right: 0;\n    margin: auto;\n    background-color: rgba(255, 255, 255, 0.2);\n    height: 3px; }\n    .control .progress .hover-wrap {\n      height: 100%;\n      width: 0;\n      position: absolute;\n      left: 0;\n      background-color: rgba(255, 255, 255, 0.5); }\n    .control .progress .buffered-progress {\n      background: gray;\n      width: 0;\n      height: 100%; }\n      .control .progress .buffered-progress .inner {\n        position: relative;\n        background: red;\n        width: 0;\n        height: 100%; }\n        .control .progress .buffered-progress .inner .point {\n          opacity: 0;\n          position: absolute;\n          top: 0;\n          bottom: 0;\n          z-index: 300;\n          left: 0;\n          margin: auto;\n          background: red;\n          width: 13px;\n          height: 13px;\n          border-radius: 13px; }\n        .control .progress .buffered-progress .inner .yellow-point {\n          height: 100%;\n          width: 7px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          bottom: 0;\n          background: yellow;\n          z-index: 101; }\n  .control .btns ul {\n    padding: 0 14px;\n    display: flex; }\n    .control .btns ul .control-left {\n      flex: 1;\n      display: flex; }\n    .control .btns ul .setting-wrap {\n      position: relative; }\n      .control .btns ul .setting-wrap:hover {\n        cursor: pointer; }\n      .control .btns ul .setting-wrap .speed-tag {\n        position: absolute;\n        z-index: 1000;\n        right: -4px;\n        top: 8px;\n        width: 20px;\n        height: 16px;\n        line-height: 16px;\n        text-align: center;\n        box-sizing: border-box;\n        font-size: 10px;\n        color: #fff;\n        transform: scale(0.7);\n        border-radius: 2px;\n        background-color: #f00; }\n    .control .btns ul li span {\n      font-size: 12px;\n      color: #fff;\n      line-height: 40px;\n      font-weight: normal; }\n    .control .btns ul li .player-btn, .control .btns ul li .volume-btn {\n      height: 100%;\n      width: 36px;\n      margin-right: 3px; }\n      .control .btns ul li .player-btn button, .control .btns ul li .volume-btn button {\n        height: 100%; }\n      .control .btns ul li .player-btn svg, .control .btns ul li .volume-btn svg {\n        fill: #fff; }\n    .control .btns ul li .setting-btn, .control .btns ul li .movie-btn, .control .btns ul li .fullscreen, .control .btns ul li .next-btn {\n      height: 100%;\n      width: 36px;\n      transition: transform .5s; }\n      .control .btns ul li .setting-btn svg, .control .btns ul li .movie-btn svg, .control .btns ul li .fullscreen svg, .control .btns ul li .next-btn svg {\n        fill: #fff; }\n    .control .btns ul li .fullscreen:hover {\n      transform: scale(1.1); }\n    .control .btns ul li .setting-menu {\n      display: none;\n      position: absolute;\n      bottom: 50px;\n      right: -40px;\n      width: 189px;\n      height: auto;\n      transition: all .5s;\n      border-radius: 3px;\n      background-color: rgba(28, 28, 28, 0.9); }\n      .control .btns ul li .setting-menu > div {\n        display: flex;\n        padding: 10px;\n        height: 33px;\n        font-size: 14px; }\n        .control .btns ul li .setting-menu > div:hover {\n          background-color: rgba(255, 255, 255, 0.1);\n          cursor: pointer; }\n        .control .btns ul li .setting-menu > div p {\n          font-size: 12px;\n          color: #fff;\n          flex: 1; }\n        .control .btns ul li .setting-menu > div > p:nth-of-type(1) {\n          text-align: left; }\n        .control .btns ul li .setting-menu > div > p:nth-of-type(2) {\n          text-align: right; }\n          .control .btns ul li .setting-menu > div > p:nth-of-type(2) i {\n            font-weight: 600; }\n    .control .btns ul li .speed-menu {\n      display: none;\n      position: absolute;\n      right: -30px;\n      width: 99px;\n      height: 290px;\n      border-radius: 3px;\n      background-color: rgba(28, 28, 28, 0.9);\n      bottom: 50px; }\n      .control .btns ul li .speed-menu p {\n        height: 33px;\n        text-align: center;\n        color: #fff;\n        line-height: 33px;\n        font-size: 12px; }\n        .control .btns ul li .speed-menu p:hover {\n          background-color: rgba(255, 255, 255, 0.1);\n          cursor: pointer; }\n      .control .btns ul li .speed-menu > p:nth-of-type(1) {\n        border-bottom: 0.5px solid #eeeeee;\n        height: 46px;\n        line-height: 46px; }\n    .control .btns ul .volume-control {\n      height: 100%;\n      width: 0;\n      padding-top: 18px;\n      margin-right: 10px;\n      transition: all 1s;\n      opacity: 0; }\n      .control .btns ul .volume-control .volume-out {\n        width: 100%;\n        height: 3px;\n        background-color: rgba(255, 255, 255, 0.2); }\n        .control .btns ul .volume-control .volume-out .volume-inner {\n          background: #fff;\n          width: 10px;\n          height: 100%;\n          position: relative; }\n          .control .btns ul .volume-control .volume-out .volume-inner .volume-point {\n            position: absolute;\n            top: 0;\n            left: 0;\n            bottom: 0;\n            margin: auto;\n            width: 9px;\n            height: 9px;\n            border-radius: 9px;\n            background: #fff;\n            z-index: 3; }\n\n.video-full {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  min-width: 100%;\n  min-height: 100%;\n  width: auto;\n  height: auto;\n  z-index: -100;\n  background-size: cover; }\n\n* {\n  box-sizing: border-box; }\n\n.video-background {\n  background: #000;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n  .video-background .video-foreground video,\n  .video-background .video video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 10; }\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by ly on 11/3/2017 AD.
 */
var log_config = {
  num: 0,
  debug: false
};

exports.default = log_config;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** * Created by ly on 11/2/2017 AD. */

var Util = __webpack_require__(1);
var util = new Util();
module.exports = function () {
    function Controller(video) {
        _classCallCheck(this, Controller);

        this.video = video;
        this.video_info = {
            duration: '',
            currentTime: '',
            volume: '',
            speed: '',
            buffered: ''
        };
        this.listen_type = {
            canplay: 'canplay',
            play: 'play',
            playing: 'playing',
            timeupdate: 'timeupdate',
            waiting: 'waiting'
        };
        this.keyboard = {
            space: 32,
            esc: 27
        };
        this.doms = {
            ui_progress_wrap: util.getDom('progress-wrap'),
            ui_progress_point: util.getDom('progress-point'),
            ui_buffered: util.getDom('buffered-progress'),
            ui_duration: util.getDom('video-duration'),
            ui_progress: util.getDom('video-progress-inner'),
            ui_fullScreen: util.getDom('full-screen'),
            ui_video_current_time: util.getDom('video-current-time'),
            ui_video_setting: util.getDom('setting-btn'),
            ui_video_setting_menu: util.getDom('setting-menu'),
            ui_video_speed_menu: util.getDom('speed-menu'),
            ui_video_speed_parent_menu: util.getDom('speed-parent-menu'),
            ui_speed_array: [].concat(_toConsumableArray(util.getDom('.speed-value'))),
            ui_back_setting: util.getDom('back-setting-parent'),
            ui_theater_btn: util.getDom('theater-btn'),
            ui_video_wrap: util.getDom('video-wrap'),
            ui_volume_out: util.getDom('volume-out'),
            ui_volume_inner: util.getDom('volume-inner'),
            ui_volume_point: util.getDom('volume-point'),
            ui_volume_control: util.getDom('volume-control'),
            ui_volume_btn: util.getDom('volume-btn'),
            ui_control_left: util.getDom('control-left'),
            ui_hover_wrap: util.getDom('hover-wrap'),
            ui_speed_tag: util.getDom('speed-tag'),
            ui_bottom_control: util.getDom('bottom-control'),
            ui_video_status_pause: util.getDom('video-status-btn'),
            ui_pause_status: util.getDom('pause-status'),
            ui_play_status: util.getDom('play-status'),
            ui_spinner: util.getDom('spinner'),
            ui_theater_wrap: util.getDom('theater-wrap'),
            ui_progress_visual_hover: util.getDom('progress-visual-hover')
        };
    }

    // entry method


    _createClass(Controller, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.listen();
            this.proxy_video_info = this.proxy_render_to_view();
            this.init_event();
            window.onload = function () {
                _this.init_volume();
            };
        }
    }, {
        key: 'in_loading',
        value: function in_loading() {
            this.doms.ui_spinner.style.display = 'block';
        }
    }, {
        key: 'after_loading',
        value: function after_loading() {
            this.doms.ui_spinner.style.display = 'none';
        }

        /**
         * after video relative size change
         */

    }, {
        key: 'recalcute_dom',
        value: function recalcute_dom() {
            this.proxy_video_info = this.proxy_render_to_view();
        }
    }, {
        key: 'init_volume',
        value: function init_volume() {
            // todo :// this 50 have issue
            var ui_volume_width = parseInt(this.get_out_css(this.doms.ui_volume_out)['width']) || 50;
            this.video.volume = 10 / ui_volume_width;
            this.doms.ui_volume_inner.style.width = this.doms.ui_volume_point.style.left = '10px';
        }
    }, {
        key: 'sync_video_info',
        value: function sync_video_info() {
            var video_info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.video_info;

            video_info.currentTime = this.video.currentTime;
            video_info.volume = this.video.volume;
            if (this.video.canplay) {
                video_info.buffered = this.video.buffered.end(0);
            }
        }
    }, {
        key: 'get_out_css',
        value: function get_out_css(ele) {
            if (typeof ele.currentStyle !== 'undefined') {
                var style = ele.currentStyle;
            } else if (typeof window.getComputedStyle !== 'undefined') {
                var style = window.getComputedStyle(ele, null);
            }
            return style;
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this2 = this;

            this.video.addEventListener(this.listen_type.canplay, function () {
                _this2.proxy_video_info.duration = _this2.video.duration;
                _this2.after_loading();
                util.log('video-canplay-now');
            });

            this.video.addEventListener(this.listen_type.waiting, function () {
                console.log('--------video is loading------');
                _this2.in_loading();
            });

            this.video.addEventListener(this.listen_type.play, function () {
                _this2.sync_and_log({
                    event_name: _this2.listen_type.play
                });
                util.log('ready! video duration is ---->' + _this2.video.duration);
            });
            this.video.addEventListener(this.listen_type.playing, function () {
                _this2.sync_and_log({
                    event_name: _this2.listen_type.timeupdate
                });
            });
            this.video.addEventListener(this.listen_type.timeupdate, function () {
                util.log('video-play-time-change-now');
                _this2.sync_and_log({
                    event_name: _this2.listen_type.timeupdate,
                    proxy: _this2.proxy_video_info
                });
            });
        }
    }, {
        key: 'sync_and_log',
        value: function sync_and_log(_ref) {
            var event_name = _ref.event_name,
                proxy = _ref.proxy;

            util.log(event_name);
            this.sync_video_info(proxy);
            this.print_video_info();
        }

        // print cat video info

    }, {
        key: 'print_video_info',
        value: function print_video_info() {
            var _this3 = this;

            Object.keys(this.video_info).forEach(function (item) {
                util.log(_this3.video_info[item]);
            });
        }

        // The video attribute is delegated to the following method, bind data - view

    }, {
        key: 'proxy_render_to_view',
        value: function proxy_render_to_view() {
            var _this4 = this;

            var progress_wrap_width = this.doms.ui_progress_wrap.clientWidth;
            util.log('get progress wrap width is ----> ' + progress_wrap_width);
            return new Proxy(this.video_info, {
                set: function set(target, key, value, receiver) {
                    util.log('ui ----> setting ---> ' + key);
                    if (Object.is('currentTime', key)) {
                        // 这里可以使用函数式编程, 进度宽度 = 进度宽度/总进度  * 当前事件/总时间
                        _this4.doms.ui_progress.style.width = _this4.doms.ui_progress_point.style.left = _this4.cal_current_progress_buffered_width(value, _this4.video_info.duration, progress_wrap_width)() + 'px';
                        _this4.doms.ui_buffered.style.width = _this4.cal_current_progress_buffered_width(_this4.video_info.buffered, _this4.video_info.duration, progress_wrap_width)() + 'px';
                        _this4.doms.ui_video_current_time.innerHTML = _this4.format_duration(value.toFixed(0));
                    }if (Object.is('duration', key)) {
                        _this4.doms.ui_duration.innerHTML = _this4.format_duration(value.toFixed(0));
                        // set yellow point
                        var pos = progress_wrap_width / 4;
                        _this4.add_yellow_point(pos, 2 * pos, 3 * pos);
                    }
                    return Reflect.set(target, key, value, receiver);
                }
            });
        }
    }, {
        key: 'cal_current_progress_buffered_width',
        value: function cal_current_progress_buffered_width(current_time, duration, wrap_with) {
            return function () {
                return current_time / duration * wrap_with;
            };
        }
    }, {
        key: 'format_duration',
        value: function format_duration(duration) {
            var sec_num = parseInt(duration, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - hours * 3600) / 60);
            var seconds = sec_num - hours * 3600 - minutes * 60;
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return hours + ':' + minutes + ':' + seconds;
        }
    }, {
        key: 'generate_yellow_point',
        value: function generate_yellow_point(pos) {
            var dom = util.generateDom();
            return dom.div({
                class: 'yellow-point',
                style: 'left:' + pos + 'px'
            });
        }
    }, {
        key: 'add_yellow_point',
        value: function add_yellow_point() {
            var _this5 = this;

            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            rest.forEach(function (item) {
                util.i(item);
                var yellow_dom = _this5.generate_yellow_point(item);
                util.addChildren(yellow_dom, _this5.doms.ui_progress);
            });
        }
    }, {
        key: 'init_event',
        value: function init_event() {
            var _this6 = this;

            // todo:// add event init Dom like android
            this.bind_event(this.doms.ui_fullScreen, 'click', function () {
                _this6.full_screen();
            });

            var drag = false,
                volume_drag = false;
            this.bind_event(this.doms.ui_progress_visual_hover, 'mousedown', function (e) {
                drag = true;
                console.log('mouse donw 事件执行');
                _this6.update_progress_after_drag(e.pageX);
            });

            this.bind_event(this.doms.ui_progress_visual_hover, 'mousemove', function (e) {
                // let width = `${e.pageX - $('#hover-wrap').offset().left}px`
                var width = e.pageX - _this6.getDomOffset(_this6.doms.ui_hover_wrap).left + 'px';
                _this6.doms.ui_hover_wrap.style.width = width;
            });

            this.bind_event(this.doms.ui_progress_visual_hover, 'mouseover', function (e) {
                var width = e.pageX - _this6.getDomOffset(_this6.doms.ui_hover_wrap).left + 'px';
                _this6.doms.ui_hover_wrap.style.width = width;
            });

            this.bind_event(this.doms.ui_progress_visual_hover, 'mouseleave', function (e) {
                _this6.doms.ui_hover_wrap.style.width = 0;
            });

            // set volume event
            this.bind_event(this.doms.ui_volume_out, 'mousedown', function (e) {
                volume_drag = true;
                _this6.update_volume_drag(e.pageX);
            });

            document.addEventListener('mouseup', function (e) {
                if (drag) {
                    drag = false;
                    _this6.update_progress_after_drag(e.pageX);
                    util.log('mouse up 事件执行');
                } else if (volume_drag) {
                    // update volume
                    volume_drag = false;
                    _this6.update_volume_drag(e.pageX);
                }
            });

            document.addEventListener('mousemove', function (e) {
                util.log('mousemove 事件执行');
                if (drag) {
                    _this6.update_progress_after_drag(e.pageX);
                } else if (volume_drag) {
                    _this6.update_volume_drag(e.pageX);
                }
            });

            this.bind_event(this.doms.ui_video_speed_parent_menu, 'click', function (e) {
                _this6.show_speed_menu();
                _this6.hide_setting_menu();
            });

            this.bind_event(this.doms.ui_video_setting, 'click', function (e) {
                var dom = e.currentTarget;
                var state = dom.dataset.state;
                if (Object.is('open', state)) {
                    _this6.hide_setting_menu();
                } else {
                    _this6.show_setting_menu();
                    if (_this6.equal('block', _this6.get_display_state(_this6.doms.ui_video_speed_menu))) {
                        _this6.hide_speed_menu();
                    }
                }
            });

            this.doms.ui_speed_array.forEach(function (item) {
                _this6.bind_event(item, 'click', function (e) {
                    var speed = e.currentTarget.innerHTML;
                    speed = _this6.equal('normal', speed) ? 1 : speed;
                    if (Number.isInteger(parseInt(speed))) {
                        _this6.doms.ui_speed_tag.innerHTML = _this6.video.playbackRate = speed === 1 ? 1.0 : speed;
                        _this6.hide_speed_menu();
                    } else {
                        throw new Error('speed is need number');
                    }
                });
            });

            this.bind_event(this.doms.ui_back_setting, 'click', function (e) {
                _this6.hide_speed_menu();
                _this6.show_setting_menu();
            });

            this.bind_event(this.doms.ui_theater_btn, 'click', function (e) {
                _this6.toggle_theater();
                _this6.recalcute_dom();
            });

            this.bind_event(this.doms.ui_volume_btn, 'mouseover', function () {
                _this6.show_volume_control();
            });

            this.bind_event(this.doms.ui_control_left, 'mouseleave', function () {
                _this6.hide_volume_control();
            });

            this.bind_event(this.doms.ui_video_wrap, 'mouseover', function (e) {
                _this6.show_bottom_control();
            });

            this.bind_event(this.doms.ui_video_wrap, 'mouseleave', function (e) {
                _this6.hide_bottom_control();
            });

            this.bind_event(this.video, 'click', function (e) {
                // this.doms.ui_video_status_pause.style.opacity = 1
                // todo:// should after video can play
                if (_this6.video.paused) {
                    _this6.video.play();
                    _this6.doms.ui_play_status.style.display = 'block';
                } else {
                    _this6.video.pause();
                    _this6.doms.ui_pause_status.style.display = 'block';
                }
                playButton.toggle();
                _this6.doms.ui_video_status_pause.style.animation = 'video_status .3s linear';
                setTimeout(function () {
                    _this6.doms.ui_video_status_pause.style.animation = '';
                    _this6.doms.ui_play_status.style.display = 'none';
                    _this6.doms.ui_pause_status.style.display = 'none';
                }, 400);
            });

            document.addEventListener('keydown', function (e) {
                var key = e.keyCode;
                console.log(key);
                if (key == _this6.keyboard.space) {
                    playButton.toggle();
                    e.preventDefault();
                } else if (key == _this6.keyboard.esc) {
                    var btn_fullscreen = util.getDom('fullscreen-wrap');
                    if (btn_fullscreen.classList.contains('video-background')) {
                        btn_fullscreen.classList.remove('video-background');
                        _this6.show_theater_btn();
                        _this6.recalcute_dom();
                    }
                }
            });
        }
    }, {
        key: 'show_bottom_control',
        value: function show_bottom_control() {
            this.doms.ui_bottom_control.style.opacity = 1;
        }
    }, {
        key: 'hide_bottom_control',
        value: function hide_bottom_control() {
            this.doms.ui_bottom_control.style.opacity = 0;
        }
    }, {
        key: 'show_volume_control',
        value: function show_volume_control() {
            this.doms.ui_volume_control.style.opacity = 1;
            this.doms.ui_volume_control.style.width = '50px';
        }
    }, {
        key: 'hide_volume_control',
        value: function hide_volume_control() {
            this.doms.ui_volume_control.style.opacity = 0;
            this.doms.ui_volume_control.style.width = '0';
        }
    }, {
        key: 'toggle_theater',
        value: function toggle_theater() {
            if (this.doms.ui_video_wrap.style.width === '100%') {
                this.doms.ui_video_wrap.style.width = '70%';
                this.doms.ui_theater_wrap.style.width = '100%';
                this.doms.ui_theater_btn.style.transform = 'scale(0.8)';
            } else {
                this.doms.ui_video_wrap.style.width = '100%';
                this.doms.ui_theater_wrap.style.width = '90%';
                this.doms.ui_theater_wrap.style.margin = 'auto';
                this.doms.ui_theater_btn.style.transform = 'scale(1)';
            }
        }
    }, {
        key: 'getOffset',
        value: function getOffset(el) {
            var _x = 0;
            var _y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }
    }, {
        key: 'getDomOffset',
        value: function getDomOffset(el) {
            el = el.getBoundingClientRect();
            return {
                left: el.left + window.scrollX,
                top: el.top + window.scrollY
            };
        }
    }, {
        key: 'equal',
        value: function equal(el1, el2) {
            if (typeof el1 === 'string') {
                el1 = this.format_str(el1);
            }
            if (typeof el2 === 'string') {
                el2 = this.format_str(el2);
            }
            return Object.is(el1, el2);
        }
    }, {
        key: 'format_str',
        value: function format_str(str) {
            return str.replace(/^\s+|\s+$/g, "");
        }
    }, {
        key: 'get_display_state',
        value: function get_display_state(ele) {
            return ele.style.display;
        }
    }, {
        key: 'hide_setting_menu',
        value: function hide_setting_menu() {
            this.doms.ui_video_setting_menu.style.display = 'none';
            this.doms.ui_video_setting.dataset.state = 'close';
            this.doms.ui_video_setting.style.transform = 'rotate(0deg)';
        }
    }, {
        key: 'show_setting_menu',
        value: function show_setting_menu() {
            this.doms.ui_video_setting_menu.style.display = 'block';
            this.doms.ui_video_setting.dataset.state = 'open';
            this.doms.ui_video_setting.style.transform = 'rotate(30deg)';
        }
    }, {
        key: 'hide_speed_menu',
        value: function hide_speed_menu() {
            this.doms.ui_video_speed_menu.style.display = 'none';
        }
    }, {
        key: 'show_speed_menu',
        value: function show_speed_menu() {
            this.doms.ui_video_speed_menu.style.display = 'block';
        }
    }, {
        key: 'update_progress_after_drag',
        value: function update_progress_after_drag(x) {
            // - process.offset.left
            // todo:// test
            // let position = x - $('#progress-point').offset().left
            // let position = x - $('#progress-point').offset().left
            var position = x - this.getDomOffset(this.doms.ui_progress_point).left;
            // console.log(position, position1)
            // set progress postion
            var progress_wrap_width = parseInt(this.doms.ui_progress_wrap.clientWidth);
            var pos = position + parseInt(this.doms.ui_progress.style.width);
            pos = pos < 0 ? 0 : pos > progress_wrap_width ? progress_wrap_width : pos;
            this.doms.ui_progress_point.style.left = this.doms.ui_progress.style.width = pos + 'px';
            // todo:// 此时 wrap width 为 null? !!!! witdth 与 client width 耗时并不是没有理由的 你对 config 原生 dom 这些属性 不熟悉！
            // todo:// 这里用  .style.width ?

            this.video.currentTime = parseInt(this.doms.ui_progress.style.width) / progress_wrap_width * this.video_info.duration;
            // todo:// this.doms.ui_video_current_time =
        }
    }, {
        key: 'update_volume_drag',
        value: function update_volume_drag(x) {
            // let position = x - $('#volume-point').offset().left
            var position = x - this.getDomOffset(this.doms.ui_volume_point).left;
            var pos = position + parseInt(this.doms.ui_volume_inner.clientWidth);
            var volume_out_width = parseInt(this.doms.ui_volume_out.clientWidth);
            console.log(pos);
            pos = pos < 0 ? 0 : pos > volume_out_width ? volume_out_width : pos;
            this.doms.ui_volume_inner.style.width = pos + 'px';
            this.doms.ui_volume_point.style.left = pos - 5 + 'px';
            //  max volume in  { 0 - 1 }
            var volume = parseInt(this.doms.ui_volume_inner.style.width) / volume_out_width;
            console.log('the volume is ->', volume);
            this.video.volume = volume;
            // volume === 0 change svg
            if (volume === 0) {
                volumeButton.goMute();
            } else if (volume < 0.5) {
                volumeButton.goMed();
            } else if (volume > 0.5) {
                volumeButton.goMax();
            }

            util.log(this.doms.ui_volume_inner.style.width, this.doms.ui_volume_out.clientWidth);
        }
    }, {
        key: 'hide_theater_btn',
        value: function hide_theater_btn() {
            this.doms.ui_theater_btn.style.display = 'none';
        }
    }, {
        key: 'show_theater_btn',
        value: function show_theater_btn() {
            this.doms.ui_theater_btn.style.display = 'block';
        }
    }, {
        key: 'full_screen',
        value: function full_screen() {
            var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.video;

            var btn_fullscreen = util.getDom('fullscreen-wrap');
            if (btn_fullscreen.classList.contains('video-background')) {
                btn_fullscreen.classList.remove('video-background');
                this.show_theater_btn();
                this.recalcute_dom();
            } else {
                btn_fullscreen.classList.add('video-background');
                this.hide_theater_btn();
                this.recalcute_dom();
            }
        }
    }, {
        key: 'bind_event',
        value: function bind_event(target, type, callBack) {
            target.addEventListener(type, function (e) {
                callBack(e);
            });
        }
    }]);

    return Controller;
}();

/***/ })
/******/ ]);