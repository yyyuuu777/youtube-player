/**
 * Created by ly on 11/2/2017 AD.
 */
require('./svg/svg')
require('./styles/app.scss')
let Util = require('./js/Util')
let Svg = require('./js/Svg')
let VolumeSvgUtil = require('./js/Svg').svg.volumeSvgUtil
let SvgUtil = require('./js/Svg').svg.svgUtil
let Controller = require('./js/Control')
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
let video = util.getDom('video')
// let videoUrl = "http://9890.vod.myqcloud.com/9890_9c1fa3e2aea011e59fc841df10c92278.f20.mp4"
let dashSrc = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"
QPlayer.init(video, dashSrc, true, true)
