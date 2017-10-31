/**
 * Created by ly on 10/31/2017 AD.
 */
// import snap util
export default class SvgUtil {
    constructor ({
        video,
        states,
        svgWrapClass,
        btnStateId,
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
            playing: document.querySelector(`#${btnStateId[0]}`),
            paused: document.querySelector(`#${btnStateId[1]}`),
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
        path.attr("class", "js-icon").attr("d", this.getStateIconPath())
    }
    toggle () {
        var path = Snap.select('.js-icon');
        this.toNextState()
        path.animate({
            d: this.stateIconPath()
        }, this.snapAnimation.time, this.snapAnimation.name);
    }
    toNextState () {
        this.state = this.states[this.state];
        if (this.state === this.states.playing) {
            this.video.pause()
        } else {
            this.video.play()
        }
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

function getEle (tag) {
    return document.querySelector(tag)
}

function getAttr (name) {
   return this.getAttribute(name)
}

function $ () {
   return {
      arrt: function (ele){

      }
   }
}
