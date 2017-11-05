/**
 * Created by ly on 11/2/2017 AD.
 */
import  log_config from './Config'
module.exports = class Util {
    getDom(id) {
        if(id.includes('.')) {
            return document.getElementsByClassName(id.substring(1))
        }
        return document.getElementById(id)
    }

    log(str) {
        log_config.debug && console.log(`${log_config.num++}：videoPlayer--->`, str)
    }

    i (str) {
        log_config.debug && console.log(`${log_config.num++} special: ${'-'.repeat(10)}> str`)
    }

    generateDom () {
        return new Proxy({}, {
            get(target, property) {
                return function(attrs = {}, ...children) {
                    const el = document.createElement(property);
                    for (let prop of Object.keys(attrs)) {
                        el.setAttribute(prop, attrs[prop]);
                    }
                    for (let child of children) {
                        if (typeof child === 'string') {
                            child = document.createTextNode(child);
                        }
                        el.appendChild(child);
                    }
                    return el;
                }
            }
        });
    }
    addChildren (cur, target) {
        target.appendChild(cur)
    }
}
