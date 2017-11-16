webpackJsonp([0],[
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


var _Config = __webpack_require__(5);

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
__webpack_require__(3);
__webpack_require__(4);
var Util = __webpack_require__(1);
var Svg = __webpack_require__(0);
var VolumeSvgUtil = __webpack_require__(0).svg.volumeSvgUtil;
var SvgUtil = __webpack_require__(0).svg.svgUtil;
var Controller = __webpack_require__(6);
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

"use strict";


/**
 * Created by ly on 10/30/2017 AD.
 */
(function (window) {
  var svgSprite = '<svg><symbol id="icon-fanhui-copy" viewBox="0 0 1024 1024"><path d="M305.866 532.207v0c1.777 3.079 3.079 6.39 5.802 9.112 0.594 0.477 1.064 0.827 1.539 1.303 0.709 0.594 0.946 1.539 1.54 2.128l331.383 319.434c8.757 8.519 20.121 12.781 31.483 12.781 11.836 0 23.79-4.733 32.666-13.964 17.398-18.107 16.924-46.871-1.183-64.265l-298.956-288.071 300.139-283.922c18.225-17.28 19.057-46.040 1.777-64.265-17.281-18.226-46.040-19.057-64.265-1.777l-334.462 316.355c-14.676 13.844-17.399 35.149-9.113 52.429 0.35 0.945 1.182 1.777 1.653 2.722v0zM305.866 532.207z"  ></path></symbol><symbol id="icon-fanhui-copy1" viewBox="0 0 1024 1024"><path d="M718.134 491.79299999999995v0c-1.777000000000001-3.0789999999999997-3.0790000000000024-6.389999999999998-5.802000000000003-9.111999999999998-0.5940000000000001-0.47699999999999976-1.0640000000000005-0.8269999999999996-1.5390000000000004-1.3029999999999995-0.7090000000000001-0.5939999999999996-0.9460000000000002-1.5389999999999995-1.5400000000000007-2.1279999999999997l-331.38300000000004-319.4339999999999c-8.757-8.519-20.121000000000006-12.780999999999992-31.483000000000004-12.780999999999988-11.836000000000002 5.329070518200751e-15-23.789999999999992 4.733000000000008-32.66599999999999 13.964000000000006-17.39799999999999 18.107000000000003-16.92399999999998 46.871 1.1830000000000247 64.265l298.9560000000001 288.0709999999999-300.13899999999995 283.92200000000014c-18.224999999999998 17.28000000000001-19.056999999999988 46.040000000000006-1.7769999999999762 64.265 17.281000000000006 18.225999999999996 46.040000000000006 19.056999999999988 64.265 1.7769999999999762l334.4619999999999-316.3550000000002c14.675999999999991-13.844000000000005 17.398999999999983-35.149 9.112999999999982-52.429-0.35000000000000014-0.9449999999999997-1.1820000000000004-1.7769999999999995-1.653000000000001-2.7219999999999995v0zM718.134 491.79299999999995z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M356.51594248 512.33968684l403.41955066-403.42645486c16.95396363-16.9429169 16.95396364-44.44374273 0-61.38804047-16.9429169-16.95396363-44.44374273-16.95396364-61.38804047 0l-434.11840383 434.12116552c-16.95810615 16.9429169-16.95810615 44.44374273 0 61.38804047l434.11978467 434.11978467c8.47422013 8.47836265 19.58446539 12.71892482 30.69332982 12.71892482s22.22049052-4.24056217 30.69332982-12.71892482c16.95810615-16.9429169 16.95810615-44.44374273 0-61.38804047l-403.42231235-403.4278357z"  ></path></symbol><symbol id="icon-right1" viewBox="0 0 1024 1024"><path d="M669.95205843 511.65492131l-409.82303559 409.83004937c-17.22307416 17.21185209-17.22307416 45.14919896 1e-8 62.36245382 17.21185209 17.22307416 45.14919896 17.22307416 62.3624538 0l441.00917214-441.01197767c17.22728244-17.21185208 17.22728243-45.14919896 1e-8-62.36245382l-441.0105749-441.0105749c-8.60873156-8.61293983-19.89532992-12.92081252-31.18052554-12.92081251s-22.57319672 4.30787268-31.18052551 12.92081251c-17.22728244 17.21185208-17.22728243 45.14919896 0 62.36245381l409.8258411 409.83145214z"  ></path></symbol></svg>';var script = function () {
    var scripts = document.getElementsByTagName("script");return scripts[scripts.length - 1];
  }();var shouldInjectCss = script.getAttribute("data-injectcss");var ready = function ready(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function loadFn() {
          document.removeEventListener("DOMContentLoaded", loadFn, false);fn();
        };document.addEventListener("DOMContentLoaded", loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }function IEContentLoaded(w, fn) {
      var d = w.document,
          done = false,
          init = function init() {
        if (!done) {
          done = true;fn();
        }
      };var polling = function polling() {
        try {
          d.documentElement.doScroll("left");
        } catch (e) {
          setTimeout(polling, 50);return;
        }init();
      };polling();d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;init();
        }
      };
    }
  };var before = function before(el, target) {
    target.parentNode.insertBefore(el, target);
  };var prepend = function prepend(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };function appendSvg() {
    var div, svg;div = document.createElement("div");div.innerHTML = svgSprite;svgSprite = null;svg = div.getElementsByTagName("svg")[0];if (svg) {
      svg.setAttribute("aria-hidden", "true");svg.style.position = "absolute";svg.style.width = 0;svg.style.height = 0;svg.style.overflow = "hidden";prepend(svg, document.body);
    }
  }if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e);
    }
  }ready(appendSvg);
})(window);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * include log config ..
 */
var log_config = {
  num: 0,
  debug: true
};

exports.default = log_config;

/***/ }),
/* 6 */
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
            video_info.buffered = this.video.buffered.end(0);
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
                util.log('--------video is loading------');
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
            var sec_num = parseInt(duration, 10);
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
                util.log('mouse donw 事件执行');
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
                    util.log('mouse up event has executed');
                } else if (volume_drag) {
                    // update volume
                    volume_drag = false;
                    _this6.update_volume_drag(e.pageX);
                }
            });

            document.addEventListener('mousemove', function (e) {
                util.log('mousemove event has executed');
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
                    speed = _this6.equal('Normal', speed) ? 1 : speed;
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
                util.log(key);
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
                this.doms.ui_theater_btn.style.transform = 'scale(1)';
            } else {
                this.doms.ui_video_wrap.style.width = '100%';
                this.doms.ui_theater_wrap.style.width = '90%';
                this.doms.ui_theater_wrap.style.margin = 'auto';
                this.doms.ui_theater_btn.style.transform = 'scale(0.8)';
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
            // util.log(position, position1)
            // set progress postion
            var progress_wrap_width = parseInt(this.doms.ui_progress_wrap.clientWidth);
            var pos = position + parseInt(this.doms.ui_progress.style.width);
            pos = pos < 0 ? 0 : pos > progress_wrap_width ? progress_wrap_width : pos;
            this.doms.ui_progress_point.style.left = this.doms.ui_progress.style.width = pos + 'px';
            this.video.currentTime = parseInt(this.doms.ui_progress.style.width) / progress_wrap_width * this.video_info.duration;
        }
    }, {
        key: 'update_volume_drag',
        value: function update_volume_drag(x) {
            // let position = x - $('#volume-point').offset().left
            var position = x - this.getDomOffset(this.doms.ui_volume_point).left;
            var pos = position + parseInt(this.doms.ui_volume_inner.clientWidth);
            var volume_out_width = parseInt(this.doms.ui_volume_out.clientWidth);
            util.log(pos);
            pos = pos < 0 ? 0 : pos > volume_out_width ? volume_out_width : pos;
            this.doms.ui_volume_inner.style.width = pos + 'px';
            this.doms.ui_volume_point.style.left = pos - 5 + 'px';
            //  max volume in  { 0 - 1 }
            var volume = parseInt(this.doms.ui_volume_inner.style.width) / volume_out_width;
            util.log('the volume is ->', volume);
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
],[2]);
//# sourceMappingURL=main.js.map