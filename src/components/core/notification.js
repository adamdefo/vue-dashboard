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

class Notification {
  constructor (options) {
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
      ttl: 1500,
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

    // создается таймер закрытия уведомления
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
   * показать notification
   */
  show () {
    this.active = true
    classie.remove(this.ntf, 'ns-hide')
    classie.add(this.ntf, 'ns-show')
    this.options.onOpen()
  }

  /**
   * закрыть notification
   */
  close () {
    let self = this

    this.active = false
    clearTimeout(this.dismissttl)
    classie.remove(this.ntf, 'ns-show')

    // ожидание на выполнение анимации закрытия уведомления
    let onEndAnimation = new Promise((resolve, reject) => {
      setTimeout(() => {
        classie.add(self.ntf, 'ns-hide')
        self.options.onClose()
        resolve()
      }, 0)
    })

    onEndAnimation
      .then(
        result => {
          setTimeout(() => {
            console.log('удалить уведомлялку')
            self.options.wrapper.removeChild(self.ntf)
          }, 250)
        }
      )
  }
}

export default Notification
