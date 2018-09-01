/**
 * notification.js v1.0.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Aleksey Kondratyev
 * http://www.adamdefo.ru
 */

import classie from './classie'

// let support = { animations: modernizr.cssanimations }
// let animEndEventNames = {
//   'WebkitAnimation': 'webkitAnimationEnd',
//   'OAnimation': 'oAnimationEnd',
//   'msAnimation': 'MSAnimationEnd',
//   'animation': 'animationend'
// }
  // animation end event name
// let animEndEventName = animEndEventNames[modernizr.prefixed('animation')]

class Notification {
  constructor (options) {
    this.isSupport = true
    this.active = false
    this.ntf = null // блок уведомления
    this.dismissttl = null
    this.options = this.defaultOptions()
    Object.assign(this.options, options)
    this.init()
  }

  defaultOptions () {
    return {
      wrapper: document.body,
      // the message
      message: 'yo!',
      // layout type: growl|attached|bar|other
      layout: 'growl',
      // effects for the specified layout:
      // for growl layout: scale|slide|genie|jelly
      // for attached layout: flip|bouncyflip
      // for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
      // ...
      effect: 'slide',
      // notice, warning, error, success
      type: 'error',
      // if the user doesn´t close the notification then we remove it
      // after the following time
      ttl: 5500,
      // callbacks
      onClose: function () { return false },
      onOpen: function () { return false }
    }
  }

  init () {
    let self = this
    // create HTML structure
    this.ntf = document.createElement('div')
    this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type
    var strinner = '<div class="ns-box-inner">'
    strinner += this.options.message
    strinner += '</div>'
    strinner += '<span class="ns-close"></span></div>'
    this.ntf.innerHTML = strinner

    // append to body or the element specified in options.wrapper
    this.options.wrapper.insertBefore(this.ntf, this.options.wrapper.firstChild)

    // dismiss after [options.ttl]ms
    this.dismissttl = setTimeout(() => {
      if (self.active) {
        self.close()
      }
    }, this.options.ttl)

    // init events
    this.initEvents()
  }

  initEvents () {
    let self = this
    // dismiss notification
    this.ntf.querySelector('.ns-close').addEventListener('click', () => { self.close() })
  }

  /**
   * показать
   */
  show () {
    this.active = true
    classie.remove(this.ntf, 'ns-hide')
    classie.add(this.ntf, 'ns-show')
    this.options.onOpen()
  }

  /**
   * закрыть
   */
  close () {
    let self = this
    this.active = false
    clearTimeout(this.dismissttl)
    classie.remove(this.ntf, 'ns-show')
    setTimeout(() => {
      classie.add(self.ntf, 'ns-hide')
      // callback
      onEndAnimationFn()
      self.options.onClose()
    }, 25)

    let onEndAnimationFn = (ev) => {
      // if (support.animations) {
      //   if (ev.target !== self.ntf) return false
      //   this.removeEventListener(animEndEventName, onEndAnimationFn)
      // }
      self.options.wrapper.removeChild(self.ntf)
    }

    // if (support.animations) {
    //   this.ntf.addEventListener(animEndEventName, onEndAnimationFn)
    // } else {
    //   onEndAnimationFn()
    // }
  }
}

export default Notification
