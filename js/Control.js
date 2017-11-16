/** * Created by ly on 11/2/2017 AD. */

let Util = require('./Util')
let util = new Util()
module.exports = class Controller {

    constructor(video) {
        this.video = video
        this.video_info = {
            duration: '',
            currentTime: '',
            volume: '',
            speed: '',
            buffered: ''
        }
        this.listen_type = {
            canplay: 'canplay',
            play: 'play',
            playing: 'playing',
            timeupdate: 'timeupdate',
            waiting: 'waiting',
        }
        this.keyboard = {
            space: 32,
            esc: 27,
        }
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
            ui_speed_array: [...util.getDom('.speed-value')],
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
            ui_progress_visual_hover: util.getDom('progress-visual-hover'),
        }
    }

    init() {
        this.listen()
        this.proxy_video_info = this.proxy_render_to_view()
        this.init_event()
        window.onload =  () => {
            this.init_volume()
        }
    }

    in_loading () {
        this.doms.ui_spinner.style.display = 'block'
    }

    after_loading () {
        this.doms.ui_spinner.style.display = 'none'
    }

    /**
     * after video relative size change
     */
    recalcute_dom () {
        this.proxy_video_info = this.proxy_render_to_view()
    }

    init_volume () {
        let ui_volume_width = parseInt(this.get_out_css(this.doms.ui_volume_out)['width']) || 50
        this.video.volume = 10 / ui_volume_width
        this.doms.ui_volume_inner.style.width = this.doms.ui_volume_point.style.left = '10px'
    }

    sync_video_info(video_info = this.video_info) {
        video_info.currentTime = this.video.currentTime
        video_info.volume = this.video.volume
        video_info.buffered = this.video.buffered.end(0)
    }

    get_out_css (ele) {
        if(typeof ele.currentStyle!=='undefined') {
            var style = ele.currentStyle
        } else if(typeof window.getComputedStyle!=='undefined') {
            var style = window.getComputedStyle(ele, null);
        }
        return style
    }

    listen() {
        this.video.addEventListener(this.listen_type.canplay, () => {
            this.proxy_video_info.duration = this.video.duration
            this.after_loading()
            util.log('video-canplay-now')
        })

        this.video.addEventListener(this.listen_type.waiting, () => {
            util.log('--------video is loading------')
            this.in_loading()
        })

        this.video.addEventListener(this.listen_type.play, () => {
            this.sync_and_log({
                event_name: this.listen_type.play
            })
            util.log(`ready! video duration is ---->${this.video.duration}`)
        })
        this.video.addEventListener(this.listen_type.playing, () => {
            this.sync_and_log({
                event_name: this.listen_type.timeupdate
            })
        })
        this.video.addEventListener(this.listen_type.timeupdate, () => {
            util.log('video-play-time-change-now')
            this.sync_and_log({
                event_name: this.listen_type.timeupdate,
                proxy: this.proxy_video_info
            })
        })
    }

    sync_and_log({event_name, proxy}) {
        util.log(event_name)
        this.sync_video_info(proxy)
        this.print_video_info()
    }

    // print cat video info
    print_video_info() {
        Object.keys(this.video_info).forEach(item => {
            util.log(this.video_info[item])
        })
    }

    // The video attribute is delegated to the following method, bind data - view
    proxy_render_to_view() {
        let progress_wrap_width = this.doms.ui_progress_wrap.clientWidth
        util.log(`get progress wrap width is ----> ${progress_wrap_width}`)
        return new Proxy(this.video_info, {
            set: (target, key, value, receiver) => {
                util.log(`ui ----> setting ---> ${key}`)
                if (Object.is('currentTime', key)) {
                    this.doms.ui_progress.style.width = this.doms.ui_progress_point.style.left = `${this.cal_current_progress_buffered_width(value, this.video_info.duration, progress_wrap_width)()}px`
                    this.doms.ui_buffered.style.width = `${this.cal_current_progress_buffered_width(this.video_info.buffered, this.video_info.duration, progress_wrap_width)()}px`
                    this.doms.ui_video_current_time.innerHTML = this.format_duration(value.toFixed(0))
                } if (Object.is('duration', key)) {
                    this.doms.ui_duration.innerHTML = this.format_duration(value.toFixed(0))
                    // set yellow point
                    let pos = progress_wrap_width/4
                    this.add_yellow_point(
                        pos,
                        2*pos,
                        3*pos
                    )
                }
                return Reflect.set(target, key, value, receiver);
            }
        });
    }

    cal_current_progress_buffered_width(current_time, duration, wrap_with) {
        return function () {
            return current_time / duration * wrap_with
        }
    }

    format_duration (duration) {
        let sec_num = parseInt(duration, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    generate_yellow_point (pos) {
        let dom = util.generateDom();
        return dom.div({
            class: 'yellow-point',
            style: `left:${pos}px`
        })
    }

    add_yellow_point (...rest) {
        rest.forEach( item => {
            util.i(item)
            let yellow_dom = this.generate_yellow_point(item)
            util.addChildren(yellow_dom, this.doms.ui_progress)
        })
    }

    init_event () {
        // todo:// add event init Dom like android
        this.bind_event(this.doms.ui_fullScreen, 'click', () => {
            this.full_screen()
        })

        let drag = false, volume_drag = false
        this.bind_event(this.doms.ui_progress_visual_hover, 'mousedown', (e) => {
            drag = true;
            util.log('mouse donw 事件执行')
            this.update_progress_after_drag(e.pageX);

        })

        this.bind_event(this.doms.ui_progress_visual_hover, 'mousemove', (e) => {
            // let width = `${e.pageX - $('#hover-wrap').offset().left}px`
            let width = `${e.pageX - this.getDomOffset(this.doms.ui_hover_wrap).left}px`
            this.doms.ui_hover_wrap.style.width = width
        })

        this.bind_event(this.doms.ui_progress_visual_hover, 'mouseover', (e) => {
            let width = `${e.pageX - this.getDomOffset(this.doms.ui_hover_wrap).left}px`
            this.doms.ui_hover_wrap.style.width = width
        })

        this.bind_event(this.doms.ui_progress_visual_hover, 'mouseleave', (e) => {
            this.doms.ui_hover_wrap.style.width = 0
        })

        // set volume event
        this.bind_event(this.doms.ui_volume_out, 'mousedown', e => {
            volume_drag = true
            this.update_volume_drag(e.pageX)
        })

        document.addEventListener('mouseup', (e) => {
            if(drag) {
                drag = false;
                this.update_progress_after_drag(e.pageX);
                util.log('mouse up event has executed')
            } else if (volume_drag) {
                // update volume
                volume_drag = false
                this.update_volume_drag(e.pageX)
            }
        })

        document.addEventListener('mousemove', (e) => {
            util.log('mousemove event has executed')
            if(drag) {
                this.update_progress_after_drag(e.pageX);
            } else if (volume_drag) {
                this.update_volume_drag(e.pageX)
            }
        })

        this.bind_event(this.doms.ui_video_speed_parent_menu, 'click', (e) => {
            this.show_speed_menu()
            this.hide_setting_menu()
        })

        this.bind_event(this.doms.ui_video_setting,'click', (e) => {
            let dom = e.currentTarget
            var state = dom.dataset.state;
            if (Object.is('open', state)) {
                this.hide_setting_menu()
            } else {
                this.show_setting_menu()
                if (this.equal('block', this.get_display_state(this.doms.ui_video_speed_menu))){
                    this.hide_speed_menu()
                }
            }
        })

        this.doms.ui_speed_array.forEach( item => {
            this.bind_event(item, 'click', e => {
                let speed = e.currentTarget.innerHTML
                speed = this.equal('Normal', speed) ? 1 : speed
                if (Number.isInteger(parseInt(speed))) {
                    this.doms.ui_speed_tag.innerHTML = this.video.playbackRate = speed === 1 ? 1.0 : speed
                    this.hide_speed_menu()
                } else {
                    throw new Error ('speed is need number')
                }

            })
        })

        this.bind_event(this.doms.ui_back_setting, 'click', e => {
            this.hide_speed_menu()
            this.show_setting_menu()
        })

        this.bind_event(this.doms.ui_theater_btn, 'click', e => {
            this.toggle_theater()
            this.recalcute_dom()
        })

        this.bind_event(this.doms.ui_volume_btn, 'mouseover', () => {
            this.show_volume_control()
        })

        this.bind_event(this.doms.ui_control_left, 'mouseleave', () => {
            this.hide_volume_control()
        })

        this.bind_event(this.doms.ui_video_wrap, 'mouseover', e => {
            this.show_bottom_control()
        })

        this.bind_event(this.doms.ui_video_wrap, 'mouseleave', e => {
            this.hide_bottom_control()
        })

        this.bind_event(this.video, 'click', e => {
            // this.doms.ui_video_status_pause.style.opacity = 1
            // todo:// should after video can play
            if (this.video.paused) {
                this.video.play()
                this.doms.ui_play_status.style.display = 'block'
            }
            else {
                this.video.pause()
                this.doms.ui_pause_status.style.display = 'block'
            }
            playButton.toggle()
            this.doms.ui_video_status_pause.style.animation = 'video_status .3s linear'
            setTimeout( () => {
                this.doms.ui_video_status_pause.style.animation = ''
                this.doms.ui_play_status.style.display = 'none'
                this.doms.ui_pause_status.style.display = 'none'
            },400)
        })


        document.addEventListener('keydown', e => {
            let key = e.keyCode
            util.log(key)
            if (key == this.keyboard.space) {
                playButton.toggle()
                e.preventDefault()
            }
            else if (key == this.keyboard.esc) {
                let btn_fullscreen = util.getDom('fullscreen-wrap')
                if (btn_fullscreen.classList.contains('video-background')) {
                    btn_fullscreen.classList.remove('video-background')
                    this.show_theater_btn()
                    this.recalcute_dom()
                }
            }
        })

    }

    show_bottom_control () {
        this.doms.ui_bottom_control.style.opacity = 1
    }

    hide_bottom_control () {
        this.doms.ui_bottom_control.style.opacity = 0
    }

    show_volume_control () {
        this.doms.ui_volume_control.style.opacity = 1
        this.doms.ui_volume_control.style.width = '50px'
    }

    hide_volume_control () {
        this.doms.ui_volume_control.style.opacity = 0
        this.doms.ui_volume_control.style.width = '0'
    }

    toggle_theater () {
        if (this.doms.ui_video_wrap.style.width === '100%'){
            this.doms.ui_video_wrap.style.width = '70%'
            this.doms.ui_theater_wrap.style.width = '100%'
            this.doms.ui_theater_btn.style.transform = 'scale(1)'
        } else {
            this.doms.ui_video_wrap.style.width = '100%'
            this.doms.ui_theater_wrap.style.width = '90%'
            this.doms.ui_theater_wrap.style.margin = 'auto'
            this.doms.ui_theater_btn.style.transform = 'scale(0.8)'
        }

    }

    getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    getDomOffset (el) {
        el = el.getBoundingClientRect()
        return {
            left: el.left + window.scrollX,
            top: el.top + window.scrollY
        }
    }
    equal (el1, el2) {
        if (typeof el1 === 'string') {
            el1 = this.format_str(el1)
        }
        if (typeof el2 === 'string') {
            el2 = this.format_str(el2)
        }
        return Object.is(el1, el2)
    }

    format_str (str) {
        return str.replace(/^\s+|\s+$/g,"");
    }

    get_display_state (ele) {
        return ele.style.display
    }

    hide_setting_menu () {
        this.doms.ui_video_setting_menu.style.display = 'none'
        this.doms.ui_video_setting.dataset.state = 'close'
        this.doms.ui_video_setting.style.transform = 'rotate(0deg)'
    }

    show_setting_menu () {
        this.doms.ui_video_setting_menu.style.display = 'block'
        this.doms.ui_video_setting.dataset.state = 'open'
        this.doms.ui_video_setting.style.transform = 'rotate(30deg)'
    }

    hide_speed_menu () {
        this.doms.ui_video_speed_menu.style.display = 'none'
    }

    show_speed_menu () {
        this.doms.ui_video_speed_menu.style.display = 'block'
    }

    update_progress_after_drag (x) {
        // - process.offset.left
        // todo:// test
        // let position = x - $('#progress-point').offset().left
        // let position = x - $('#progress-point').offset().left
        let position = x - this.getDomOffset(this.doms.ui_progress_point).left
        // util.log(position, position1)
        // set progress postion
        let progress_wrap_width = parseInt(this.doms.ui_progress_wrap.clientWidth)
        let pos = position + parseInt(this.doms.ui_progress.style.width)
        pos = pos < 0 ? 0 : pos > progress_wrap_width ? progress_wrap_width : pos
        this.doms.ui_progress_point.style.left = this.doms.ui_progress.style.width = `${pos}px`
        this.video.currentTime = parseInt(this.doms.ui_progress.style.width) / progress_wrap_width * this.video_info.duration
    }

    update_volume_drag (x) {
        // let position = x - $('#volume-point').offset().left
        let position = x - this.getDomOffset(this.doms.ui_volume_point).left
        let pos = position + parseInt(this.doms.ui_volume_inner.clientWidth)
        let volume_out_width = parseInt(this.doms.ui_volume_out.clientWidth)
        util.log(pos)
        pos = pos < 0 ? 0 : pos > volume_out_width ? volume_out_width : pos
        this.doms.ui_volume_inner.style.width =  `${pos}px`
        this.doms.ui_volume_point.style.left = `${pos-5}px`
        //  max volume in  { 0 - 1 }
        let volume = parseInt(this.doms.ui_volume_inner.style.width) / volume_out_width
        util.log('the volume is ->', volume)
        this.video.volume = volume
        // volume === 0 change svg
        if (volume === 0) {
            volumeButton.goMute()
        }else if (volume<0.5) {
            volumeButton.goMed()
        } else if(volume>0.5){
            volumeButton.goMax()
        }

        util.log(this.doms.ui_volume_inner.style.width, this.doms.ui_volume_out.clientWidth)
    }

    hide_theater_btn () {
        this.doms.ui_theater_btn.style.display = 'none'
    }

    show_theater_btn () {
        this.doms.ui_theater_btn.style.display = 'block'
    }

    full_screen (elem = this.video) {
        let btn_fullscreen = util.getDom('fullscreen-wrap')
        if (btn_fullscreen.classList.contains('video-background')) {
            btn_fullscreen.classList.remove('video-background')
            this.show_theater_btn()
            this.recalcute_dom()
        } else {
            btn_fullscreen.classList.add('video-background')
            this.hide_theater_btn()
            this.recalcute_dom()
        }
    }

    bind_event(target, type, callBack){
        target.addEventListener(type, function (e) {
            callBack(e)
        })
    }
}
