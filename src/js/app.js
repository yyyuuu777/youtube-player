exports = module.exports = {}
require('./svgicon/svg')
require('../styles/app.scss')
let Util = require('./util')
let Svg = require('./svg')
let VolumeSvgUtil = require('./svg').svg.volumeSvgUtil
let SvgUtil = require('./svg').svg.svgUtil
let Controller = require('./control')
let util = new Util()

let QPlayer = {
    init: function(video, src, isDash, qTheme) {
        video.src = src
        if (isDash) {
            video.setAttribute('data-dashjs-player', '')
        }
        qTheme && useQplayer(video) || ''
    }
}
function useQplayer (video) {
    // todo:// set video lock
    let video_obj = new Controller(video)
    video_obj.init()

    // recalculate window
    window.addEventListener('resize', function () {
        video_obj.recalcute_dom()
    })

    let volumeButton = new VolumeSvgUtil({
        video:video,
        states:[
            {
                name:'mute',
                callBack: function(){
                    this.video.volume = 0
                    video_obj.doms.ui_volume_inner.style.width = video_obj.doms.ui_volume_point.style.left = 0
                }
            },
            {
                name:'med',
                callBack: function(){
                    video.volume = 10 / video_obj.doms.ui_volume_out.clientWidth
                    video_obj.doms.ui_volume_inner.style.width = video_obj.doms.ui_volume_point.style.left = '10px'
                }
            },
        ],
        svgWrapClass: '.volume',
        useDomId: 'volume-btn-use',
        svgId: 'svg-volume',
        snapAnimation: {
            time: 200,
            name: mina.linear
        }
    })
    let playButton = new SvgUtil({
        video:video,
        states:[
            {
                name:'paused',
                callBack: function(){
                    this.video.play()
                }
            },
            {
                name:'playing',
                callBack: function(){
                    this.video.pause()
                }
            },
        ],
        svgWrapClass: '.js-button',
        useDomId: 'play-btn-use',
        svgId: 'svgicon',
        snapAnimation: {
            time: 200,
            name: mina.linear
        }
    })
    playButton.init();
    volumeButton.init();
    window.playButton = playButton
    window.volumeButton = volumeButton
}

exports.Qplayer = QPlayer


