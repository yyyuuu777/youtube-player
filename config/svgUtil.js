/**
 * Created by ly on 10/31/2017 AD.
 */
// import snap util
class SvgUtil {
    constructor ({
        video,
        states,
        svgWrapClass,
        useDomId,
        svgId,
        snapAnimation,
    }) {
        // 用一个对象接收岂不更好 如 this.a = {}
        this.video = video
        this.states = states
        this.svgWrapClass = svgWrapClass
        this.btnStateId = btnStateId
        this.svgId = svgId
        this.useDomId = useDomId
        this.snapAnimation = snapAnimation
        this.el = document.querySelector(svgWrapClass)
        this.iconEls = {
            [this.states[0].name]: document.querySelector(`#${this.states[0].name}`),
            [this.states[1].name]: document.querySelector(`#${this.states[1].name}`),
        }
    }

    setInitialState () {
       let initIconRef = this.el.querySelector('use').getAttribute("xlink:href")
       this.state = this.el.querySelector(initialIconRef).getAttribute("data-state");
    }
    replaceUseEl () {
        let path = Snap(`#${this.svgId}`).paper.path();
        let ele = document.getElementById(this.useDomId)
        ele.parentNode.removeChild(ele);
        // $(".js-button").find("use").remove();
        Snap(`#${this.svgId}`).append(path);
        path.attr("class", `c_${this.useDomId}`).attr("d", this.getStateIconPath())
    }
    toggle () {
        var path = Snap.select(`c_${this.useDomId}`);
        this.toNextState()
        path.animate({
            d: this.stateIconPath()
        }, this.snapAnimation.time, this.snapAnimation.name);
    }
    toNextState () {
        this.state = this.states[this.state];
        this.states.forEach( item => {
            Object.is(this.state, item.name) && item.callBack.call(this);
        })
    }
    getStateIconPath () {
       return this.iconEls[this.state].getAttribute('d')
    }

    init () {
        init.call(this)
    }
}

// private method
function init () {
    this.setInitialState()
    this.replaceUseEl()
}

new SvgUtil({
    video:video,
    states:[
        {
            name:'paused',
            callBack: function(){
               this.video.pause()
            }
        },
        {
            name:'play',
            callBack: function(){
                this.video.play()
            }
        },
    ],
    svgWrapClass: '.js-button',
    useDomId: 'play-btn-use',
    svgId: 'svgicon',
    snapAnimation: {
        time: 500,
        name: mina.linear
    }
})


class VolumeSvgUtil extends  SvgUtil{
    constructor (param) {
        super(param)
        this.statesObj['max'] = 'max'
    }
    goMute  () {
        this.state = this.statesObj['med']
        this.animate()
    }
    goMed () {
        this.state = this.statesObj['mute']
        this.animate()
    }
    goMax () {
        this.state = this.statesObj['max']
        this.animate()
    }
    replaceUseEl () {
        super.replaceUseEl()
        this.path = Snap.select(`.c_${this.useDomId}`);
    }
    animate () {
        this.path.animate({
            d: this.getStateIconPath()
        }, this.snapAnimation.time, this.snapAnimation.name);
    }
}



