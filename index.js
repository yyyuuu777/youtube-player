const QPlayer = require('./src/js/app').Qplayer
let video = document.getElementById('video')
// let videoUrl = "http://9890.vod.myqcloud.com/9890_9c1fa3e2aea011e59fc841df10c92278.f20.mp4"
let dashSrc = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"
QPlayer.init(video, dashSrc, true, true)
