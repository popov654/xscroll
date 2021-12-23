var XScroll = {}

XScroll.private = {}

XScroll.scrollX = function(obj, ratio) {
   var width = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
               obj.firstElementChild.clientWidth : obj.firstElementChild.scrollWidth
   if (width <= obj.clientWidth) return
   var x = Math.round((obj.firstElementChild.clientWidth - obj.clientWidth) * ratio)
   if (x < 0) x = 0
   if (x > width - obj.clientWidth) {
      x = width - obj.clientWidth
   }
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.left = -x + 'px'
   } else {
      obj.firstElementChild.scrollLeft = x
   }
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollY = function(obj, ratio) {
   var height = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
                obj.firstElementChild.clientHeight : obj.firstElementChild.scrollHeight
   if (height <= obj.clientHeight) return
   var y = Math.round((height - obj.clientHeight) * ratio)
   if (y < 0) y = 0
   if (y > height - obj.clientHeight) {
      y = height - obj.clientHeight
   }
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.top = -y + 'px'
   } else {
      obj.firstElementChild.scrollTop = y
   }
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollLeft = function(obj) {
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.left = '0px'
   } else {
      obj.firstElementChild.scrollLeft = 0
   }
   this.private.setXThumb(obj, 0)
   XScroll.fireEvent(XScroll.object, 'scroll')
   XScroll.fireEvent(XScroll.object, 'scrollend')
}

XScroll.scrollRight = function(obj) {
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.left = obj.clientWidth - obj.firstElementChild.clientWidth + 'px'
   } else {
      obj.firstElementChild.scrollLeft = obj.firstElementChild.clientWidth - obj.clientWidth
   }
   this.private.setXThumb(obj, 1)
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollTop = function(obj) {
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.top = '0px'
   } else {
      obj.firstElementChild.scrollTop = 0
   }
   this.private.setYThumb(obj, 0)
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollBottom = function(obj) {
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.top = obj.clientHeight - obj.firstElementChild.clientHeight + 'px'
   } else {
      obj.firstElementChild.scrollTop = obj.firstElementChild.clientHeight - obj.clientHeight
   }
   this.private.setYThumb(obj, 1)
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollToX = function(obj, value) {
   var width = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
               obj.firstElementChild.clientWidth : obj.firstElementChild.scrollWidth
   if (width <= obj.clientWidth) return
   if (value < 0) value = 0
   if (value > width - obj.clientWidth) {
      value = width - obj.clientWidth
   }
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.left = -value + 'px'
   } else {
      obj.firstElementChild.scrollLeft = value
   }
   this.private.setXThumb(obj, value / (width - obj.clientWidth))
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollToY = function(obj, value) {
   var height = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
                obj.firstElementChild.clientHeight : obj.firstElementChild.scrollHeight
   if (height <= obj.clientHeight) return
   if (value < 0) value = 0
   if (value > height - obj.clientHeight) {
      value = height - obj.clientHeight
   }
   if (obj.firstElementChild.tagName.toLowerCase() != 'textarea') {
      obj.firstElementChild.style.top = -value + 'px'
   } else {
      obj.firstElementChild.scrollTop = value
   }
   this.private.setYThumb(obj, value / (height - obj.clientHeight))
   XScroll.fireEvent(obj, 'scroll')
   XScroll.fireEvent(obj, 'scrollend')
}

XScroll.scrollLeft = function(obj, delta) {
   var x = this.getXPosition(obj)
   if (obj.getAttribute('scroll-delta')) {
      delta = parseInt(obj.getAttribute('scroll-delta'))
   }
   this.scrollToX(obj, x-delta)
}

XScroll.scrollRight = function(obj, delta) {
   var x = this.getXPosition(obj)
   if (obj.getAttribute('scroll-delta')) {
      delta = parseInt(obj.getAttribute('scroll-delta'))
   }
   this.scrollToX(obj, x+delta)
}

XScroll.scrollUp = function(obj, delta) {
   var y = this.getYPosition(obj)
   if (obj.getAttribute('scroll-delta')) {
      delta = parseInt(obj.getAttribute('scroll-delta'))
   }
   this.scrollToY(obj, y-delta)
}

XScroll.scrollDown = function(obj, delta) {
   var y = this.getYPosition(obj)
   if (obj.getAttribute('scroll-delta')) {
      delta = parseInt(obj.getAttribute('scroll-delta'))
   }
   this.scrollToY(obj, y+delta)
}

XScroll.getScrollWidth = function(obj) {
   return obj.firstElementChild.tagName.toLowerCase() != 'textarea' ? Math.max(0, obj.firstElementChild.clientWidth - obj.clientWidth) : obj.firstElementChild.scrollWidth
}

XScroll.getScrollHeight = function(obj) {
   return obj.firstElementChild.tagName.toLowerCase() != 'textarea' ? Math.max(0, obj.firstElementChild.clientHeight - obj.clientHeight) : obj.firstElementChild.scrollHeight
}

XScroll.updateThumbPosition = function(obj) {
   if (XScroll.hasXScroll(obj)) {
      this.private.updateThumbXPosition(obj)
   } else {
      this.private.updateThumbYPosition(obj)
   }
}

XScroll.private.updateThumbXPosition = function(obj) {
   var x = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
           - obj.firstElementChild.offsetLeft : obj.firstElementChild.scrollLeft

   var width = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
                obj.firstElementChild.clientWidth - obj.clientWidth : obj.firstElementChild.scrollWidth - obj.clientWidth

   this.setXThumb(obj, x / width)
   this.updateXState(obj, width > 0)
}

XScroll.private.updateThumbYPosition = function(obj) {
   var y = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
           - obj.firstElementChild.offsetTop : obj.firstElementChild.scrollTop

   var height = obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
                obj.firstElementChild.clientHeight - obj.clientHeight : obj.firstElementChild.scrollHeight - obj.clientHeight

   this.setYThumb(obj, y / height)
   this.updateYState(obj, height > 0)
}

XScroll.getPosition = function(obj) {
   if (XScroll.hasXScroll(obj)) {
      return this.getXPosition(obj)
   } else {
      return this.getYPosition(obj)
   }
}

XScroll.getXPosition = function(obj) {
   return obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
           - obj.firstElementChild.offsetLeft : obj.firstElementChild.scrollLeft
}

XScroll.getYPosition = function(obj) {
   return obj.firstElementChild.tagName.toLowerCase() != 'textarea' ?
           - obj.firstElementChild.offsetTop : obj.firstElementChild.scrollTop
}

XScroll.private.setXThumb = function(obj, ratio) {
   if (isNaN(ratio)) ratio = 0
   ratio = Math.min(Math.max(ratio, 0), 1)
   var thumb = getElementsByClass('xscroll_thumb_horz', obj, 'div')[0]
   var x = Math.round((thumb.parentNode.clientWidth - thumb.clientWidth) * ratio)
   thumb.style.left = x + 'px'
}

XScroll.private.setYThumb = function(obj, ratio) {
   if (isNaN(ratio)) ratio = 0
   ratio = Math.min(Math.max(ratio, 0), 1)
   var thumb = getElementsByClass('xscroll_thumb_vert', obj, 'div')[0]
   var y = Math.round((thumb.parentNode.clientHeight - thumb.clientHeight) * ratio)
   thumb.style.top = y + 'px'
}

XScroll.private.updateXState = function(obj, enable) {
   obj.children[0].style.bottom = (enable ? obj.children[2].clientHeight : 0) + 'px'
   obj.children[1].style.display = enable ? '' : 'none'
   obj.children[2].style.display = enable ? '' : 'none'
   obj.children[3].style.display = enable ? '' : 'none'
   XScroll.updateThumbSize(obj)
}

XScroll.private.updateYState = function(obj, enable) {
   obj.children[0].style.right = (enable ? obj.children[2].clientWidth : 0) + 'px'
   obj.children[1].style.display = enable ? '' : 'none'
   obj.children[2].style.display = enable ? '' : 'none'
   obj.children[3].style.display = enable ? '' : 'none'
   XScroll.updateThumbSize(obj)
}

XScroll.updateThumbSize = function(obj) {
   var button_size = 10
   if (obj.getAttribute('button-size')) {
      button_size = parseInt(obj.getAttribute('button-size'))
   }
   var thumb_size = 80
   if (XScroll.hasXScroll(obj) && obj.clientWidth == 0 || XScroll.hasYScroll(obj) && obj.clientHeight == 0) return
   if (!obj.getAttribute('thumb-length')) {
      if (XScroll.hasXScroll(obj)) {
         thumb_size = Math.max(Math.round((obj.clientWidth - button_size * 2) *
                               Math.min(1, (obj.clientWidth / obj.children[0].clientWidth))), thumb_size)
      } else {
         thumb_size = Math.max(Math.round((obj.clientHeight - button_size * 2) *
                               Math.min(1, (obj.clientHeight / obj.children[0].clientHeight))), thumb_size)
      }
   } else {
      thumb_size = parseInt(obj.getAttribute('thumb-length'))
   }
   if (XScroll.hasXScroll(obj)) {
      obj.children[2].children[0].style.width = thumb_size + 'px'
   } else {
      obj.children[2].children[0].style.height = thumb_size + 'px'
   }
}

XScroll.private.scrollCont = function(func) {
   if (XScroll.cont) {
      func()
      XScroll.fireEvent(XScroll.object, 'scroll')
      setTimeout(function() { XScroll.private.scrollCont(func) }, 50)
   }
}

XScroll.private.stopScroll = function() {
   if (XScroll.timer) {
      clearTimeout(XScroll.timer)
      XScroll.timer = null
   }
   if (!XScroll.object) return
   XScroll.fireEvent(XScroll.object, 'scrollend')
   XScroll.object = null
   XScroll.cont = false
}

XScroll.hasXScroll = function(el) {
   return el.className.match(/(^|\s)scroll_x(\s|$)/)
}

XScroll.hasYScroll = function(el) {
   return el.className.match(/(^|\s)scroll_y(\s|$)/)
}

XScroll.timer = null

XScroll.initAll = function(force) {
   var els = getElementsByClass('scrollable', null, null)
   for (var i = 0; i < els.length; i++) {
      this.init(els[i], force)
   }
}

XScroll.init = function(el, force) {
   var tag = el.tagName.toLowerCase()
   if (tag != 'textarea') tag = 'div'
   var c = document.createElement(tag)
   if (tag != 'textarea') {
      var len = el.childNodes.length
      for (var i = 0; i < len; i++) {
         c.appendChild(el.childNodes[0])
      }
   }
   else c.value = el.value

   var st = el.currentStyle || getComputedStyle(el, '')

   var size = 10
   if (el.getAttribute('scroll-size')) {
      size = Math.max(parseInt(el.getAttribute('scroll-size')), 2)
   }
   if (XScroll.hasXScroll(el)) {
      c.style.width = 'auto'
   } else {
      c.style.height = 'auto'
   }
   if (el.getAttribute('viewport-height')) {
      if (parseInt(el.style.height) < el.getAttribute('viewport-height') && tag != 'textarea' && !force) return
      el.style.height = parseInt(el.getAttribute('viewport-height')) + 'px'
   } else if (!st.height.match(/%$/)) {
      var h = parseInt(st.height)
      var sizing = (st['boxSizing']) ? st['boxSizing'] : st['box-sizing']
      if (sizing == 'content-box') {
         var pad_t = (st['paddingTop']) ? parseInt(st['paddingTop']) : parseInt(st['padding-top'])
         var pad_b = (st['paddingBottom']) ? parseInt(st['paddingBottom']) : parseInt(st['padding-bottom'])
         h += pad_t + pad_b
      }
      if (sizing == 'content-box' || sizing == 'padding-box') {
         var b_t = (st['borderTop']) ? parseInt(st['borderTop']) : parseInt(st['border-top'])
         var b_b = (st['borderBottom']) ? parseInt(st['borderBottom']) : parseInt(st['border-bottom'])
         h += b_t + b_b
      }
      el.style.height = h + 'px'
   } else {
      el.style.height = st.height
   }
   if (el.getAttribute('viewport-width')) {
      if (parseInt(el.style.width) < el.getAttribute('viewport-width') && tag != 'textarea' && !force) return
      el.style.width = parseInt(el.getAttribute('viewport-width')) + 'px'
   } else if (!(st.left.match(/^\d+%$/) && st.right.match(/^\d+%$/)) && !st.width.match(/^\d+%$/)){
      var w = 0
      if (st.width == 'auto') {
         var el2 = el
         w = st.width
         while (el2 != document && w == 'auto') {
            var st2 = el2.currentStyle ? el2.currentStyle : getComputedStyle(el2, '')
            w = st2.width
            if (w == 'auto' && st2.position == 'absolute' && st2.left != 'auto' && st2.right != 'auto' || el2.clientWidth > 0) {
               w = el2.clientWidth
            }
            el2 = el2.parentNode
         }
      } else w = parseInt(st.width)
      if (w > 0) {
         var sizing = (st['boxSizing']) ? st['boxSizing'] : st['box-sizing']
         if (sizing == 'content-box') {
            var pad_l = (st['paddingLeft']) ? parseInt(st['paddingLeft']) : parseInt(st['padding-left'])
            var pad_r = (st['paddingRight']) ? parseInt(st['paddingRight']) : parseInt(st['padding-right'])
            w += pad_l + pad_r
         }
         if (sizing == 'content-box' || sizing == 'padding-box') {
            var b_l = (st['borderLeftWidth']) ? parseInt(st['borderLeftWidth']) : parseInt(st['border-left-width'])
            var b_r = (st['borderRightWidth']) ? parseInt(st['borderRightWidth']) : parseInt(st['border-right-width'])
            w += b_l + b_r
         }
         el.style.width = w + 'px'
      }
   }

   if (tag == 'textarea') {
      el.parentNode.insertBefore(document.createElement('div'), el)
      var attrs = el.attributes
      var temp = el.previousSibling
      for (var i = 0; i < attrs.length; i++) {
         if (attrs[i].name != 'name' && attrs[i].name != 'id' && attrs[i].name.indexOf('data-') != 0 &&
             attrs[i].name != 'rows' && attrs[i].name != 'cols' && attrs[i].name != 'disabled') {
            temp.setAttribute(attrs[i].name, attrs[i].value)
         } else {
            c.setAttribute(attrs[i].name, attrs[i].value)
         }
      }
      
      c.style.color = st.color
      c.style.resize = 'none'
      c.style.overflow = 'hidden'
      copyStyles(temp, c)

      c.onclick = el.onclick
      c.onmouseover = el.onmouseover
      c.onmouseout = el.onmouseout
      c.onmouseenter = el.onmouseenter
      c.onmouseleave = el.onmouseleave
      c.onkeyup = el.onkeyup
      c.onkeydown = el.onkeydown
      c.onkeypress = el.onkeypress
      c.oninput = el.oninput
      c.onpaste = el.onpaste
      el.parentNode.removeChild(el)
      el = temp
   } else {
      copyStyles(el, c)
   }
   
   function copyStyles(from, to) {
      var st = from.currentStyle || getComputedStyle(from, '')
      var st2 = to.currentStyle || getComputedStyle(to, '')
      to.style.display = (st.display == 'block') ? 'block' : 'inline-block'
      to.style.background = st.background
      if (st && to.style.background == '') {
         to.style.backgroundColor = st.backgroundColor
         to.style.backgroundImage = st.backgroundImage
         to.style.backgroundSize = st.backgroundSize
         to.style.backgroundPosition = st.backgroundPosition
         to.style.backgroundRepeat = st.backgroundRepeat
      }

      to.style.boxShadow = st['boxShadow'] || st['box-shadow']
      from.style.background = 'none'
      from.style.boxShadow = 'none'
      from.style.overflow = 'hidden'
      from.style.fontFamily = st['fontFamily'] || st['font-family']
      from.style.fontSize = st['fontSize'] || st['font-size']
      from.style.fontWeight = st['fontWeight'] || st['font-weight']
      from.style.fontStyle = st['fontStyle'] || st['font-style']
      from.style.lineHeight = st['lineHeight'] || st['line-height']

      if (st.margin != '') {
         to.style.margin = st.margin
      } else {
         to.style.marginTop = st['marginTop'] || st['margin-top']
         to.style.marginLeft = st['marginLeft'] || st['margin-left']
         to.style.marginRight = st['marginRight'] || st['margin-right']
         to.style.marginBottom = st['marginBottom'] || st['margin-bottom']
      }
      from.style.margin = '0px'

      var padding = st.padding
      if (st.padding == '' &&
          (st.paddingRight != '' || st.paddingRight != '' ||
           st.paddingRight != '' || st.paddingRight != '')) {
         padding = (st.paddingTop +    ' ' || '0 ') + (st.paddingRight + ' ' || '0 ') +
                   (st.paddingBottom + ' ' || '0 ') + (st.paddingLeft || '0')
      }

      if (st.position == 'static') from.style.position = 'relative'
      to.style.position = 'absolute'
      from.style.boxSizing = 'border-box'
      from.style.padding = '0px'
      to.style.boxSizing = 'border-box'
      to.style.padding = padding

      if (from.tagName.toLowerCase() != 'textarea') return

      to.style.borderTop = st['borderTop'] || st['border-top']
      to.style.borderLeft = st['borderLeft'] || st['border-left']
      to.style.borderRight = st['borderRight'] || st['border-right']
      to.style.borderBottom = st['borderBottom'] || st['border-bottom']

      if (navigator.userAgent.indexOf('Firefox') != -1) {
         to.style.borderTopColor = st['borderTopColor']
         to.style.borderLeftColor = st['borderLeftColor']
         to.style.borderRightColor = st['borderRightColor']
         to.style.borderBottomColor = st['borderBottomColor']

         to.style.borderTopStyle = st['borderTopStyle']
         to.style.borderLeftStyle = st['borderLeftStyle']
         to.style.borderRightStyle = st['borderRightStyle']
         to.style.borderBottomStyle = st['borderBottomStyle']

         to.style.borderTopWidth = st['borderTopWidth']
         to.style.borderLeftWidth = st['borderLeftWidth']
         to.style.borderRightWidth = st['borderRightWidth']
         to.style.borderBottomWidth = st['borderBottomWidth']
      }
      from.style.outline = 'none'
      from.style.border = 'none'
   }

   el.innerHTML = ''

   el.style.boxSizing = 'content-box'
   if (!el.style.width.match(/%$/)) el.style.width = parseInt(el.style.width) - parseInt(st['borderLeftWidth']) - parseInt(st['borderRightWidth']) + 'px'
   if (!el.style.height.match(/%$/)) el.style.height = parseInt(el.style.height) - parseInt(st['borderTopWidth']) - parseInt(st['borderBottomWidth']) + 'px'

   if (XScroll.hasXScroll(el)) {
      c.style.bottom = size + 'px'
   } else {
      c.style.right = size + 'px'
   }
   if (tag == 'textarea') {
      if (XScroll.hasXScroll(el)) {
         c.style.height = parseInt(el.style.height) - size + 'px'
         c.style.width = parseInt(el.style.width) + 'px'
      } else {
         c.style.height = parseInt(el.style.height) + 'px'
         c.style.width = parseInt(el.style.width) - size + 'px'
      }
   }
   c.style.left = '0px'
   c.style.top = '0px'
   el.appendChild(c)
   var button1 = document.createElement('div')
   var track = document.createElement('div')
   var thumb = document.createElement('div')
   var button2 = document.createElement('div')
   var button_size = 10
   if (el.getAttribute('button-size')) {
      button_size = parseInt(el.getAttribute('button-size'))
   }
   if (XScroll.hasXScroll(el)) {
      thumb.style.height = size + 'px'
   } else {
      thumb.style.width = size + 'px'
   }
   if (XScroll.hasXScroll(el)) {
      button1.style.width = button_size + 'px'
      button1.style.height = size + 'px'
      track.style.height = size + 'px'
      //track.style.width = el.clientWidth - button_size * 2 + 'px'
      button2.style.width = button_size + 'px'
      button2.style.height = size + 'px'

      button1.style.position = 'absolute'
      button1.style.left = '0px'
      button1.style.bottom = '0px'
      track.style.position = 'absolute'
      track.style.left = button_size + 'px'
      track.style.right = button_size + 'px'
      track.style.bottom = '0px'
      thumb.style.position = 'absolute'
      thumb.style.left = '0px'
      thumb.style.top = '0px'
      button2.style.position = 'absolute'
      button2.style.right = '0px'
      button2.style.bottom = '0px'

      button1.className = 'xscroll_btn_left'
      button2.className = 'xscroll_btn_right'
      track.className = 'xscroll_track_horz'
      thumb.className = 'xscroll_thumb_horz'
   } else {
      button1.style.height = button_size + 'px'
      button1.style.width = size + 'px'
      track.style.width = size + 'px'
      //track.style.height = el.clientHeight - button_size * 2 + 'px'
      button2.style.height = button_size + 'px'
      button2.style.width = size + 'px'

      button1.style.position = 'absolute'
      button1.style.top = '0px'
      button1.style.right = '0px'
      track.style.position = 'absolute'
      track.style.top = button_size + 'px'
      track.style.bottom = button_size + 'px'
      track.style.right = '0px'
      thumb.style.position = 'absolute'
      thumb.style.left = '0px'
      thumb.style.top = '0px'
      button2.style.position = 'absolute'
      button2.style.bottom = '0px'
      button2.style.right = '0px'

      button1.className = 'xscroll_btn_up'
      button2.className = 'xscroll_btn_down'
      track.className = 'xscroll_track_vert'
      thumb.className = 'xscroll_thumb_vert'
   }
   if (el.getAttribute('thumb-width')) {
      var w = parseInt(el.getAttribute('thumb-width'))
      if (XScroll.hasXScroll(el)) {
         thumb.style.height = w + 'px'
         thumb.style.top = Math.round((size-w)/2) + 'px'
      } else {
         thumb.style.width = w + 'px'
         thumb.style.left = Math.round((size-w)/2) + 'px'
      }
   }
   var x = XScroll.hasXScroll(el)
   var y = XScroll.hasYScroll(el)
   if (tag == 'textarea') {
      if (x && el.firstChild.scrollWidth <= parseInt(el.style.width) ||
          y && el.firstChild.scrollHeight <= parseInt(el.style.height)) {
         button1.style.display = 'none'
         track.style.display = 'none'
         button2.style.display = 'none'
         if (x) {
            el.firstChild.style.bottom = '0px'
            el.firstChild.style.height = parseInt(el.style.height) + 'px'
         }
         if (y) {
            el.firstChild.style.right = '0px'
            el.firstChild.style.width = parseInt(el.style.width) + 'px'
         }
      }
   }
   el.appendChild(button1)
   el.appendChild(track)
   el.appendChild(button2)
   track.appendChild(thumb)
   XScroll.updateThumbSize(el)
   
   var type = 'ontouchstart' in window ? 'touchstart' : 'mousedown'
   
   var f_down = function(event) {
      var e = event || window.event
      if (e.targetTouches && e.targetTouches.length) {
         e.clientX = e.targetTouches[0].clientX
         e.clientY = e.targetTouches[0].clientY
      }
      if (XScroll.hasXScroll(this.parentNode.parentNode)) {
         XScroll.delta = e.clientX - window.scrollX - this.getBoundingClientRect().left
      } else {
         XScroll.delta = e.clientY - window.scrollY - this.getBoundingClientRect().top
      }
      XScroll.drag = true
      XScroll.object = this
      cancelEvent(e)
      cancelSelection()
      try { if (e.preventDefault) e.preventDefault() } catch(ex) {}
   }
   addEventHandler(thumb, type, f_down)
   
   var type = 'ontouchmove' in window ? 'touchmove' : 'mousemove'
   
   var f_move = function(event) {
      if (!XScroll.drag || !XScroll.object) return
      var e = event || window.event
      if (e.targetTouches && e.targetTouches.length) {
         e.clientX = e.targetTouches[0].clientX
         e.clientY = e.targetTouches[0].clientY
      }
      if (XScroll.hasXScroll(XScroll.object.parentNode.parentNode)) {
         var x = e.clientX - window.scrollX - XScroll.delta - XScroll.object.parentNode.getBoundingClientRect().left
         if (x < 0) x = 0
         if (x > XScroll.object.parentNode.clientWidth - XScroll.object.clientWidth) {
            x = XScroll.object.parentNode.clientWidth - XScroll.object.clientWidth
         }
         XScroll.object.style.left = x + 'px'
         XScroll.scrollX(XScroll.object.parentNode.parentNode, x / (XScroll.object.parentNode.clientWidth - XScroll.object.clientWidth))
      } else {
         var y = e.clientY - window.scrollY - XScroll.delta - XScroll.object.parentNode.getBoundingClientRect().top
         if (y < 0) y = 0
         if (y > XScroll.object.parentNode.clientHeight - XScroll.object.clientHeight) {
            y = XScroll.object.parentNode.clientHeight - XScroll.object.clientHeight
         }
         XScroll.object.style.top = y + 'px'
         XScroll.scrollY(XScroll.object.parentNode.parentNode, y / (XScroll.object.parentNode.clientHeight - XScroll.object.clientHeight))
      }
      try { if (e.preventDefault) e.preventDefault() } catch(ex) {}
   }
   addEventHandler(document, type, f_move)

   var type = 'ontouchend' in window ? 'touchend' : 'mouseup'
   
   var f_up = function(event) {
      if (!XScroll.drag) return
      XScroll.delta = 0
      XScroll.drag = false
      XScroll.object = null
      restoreSelection()
   }
   addEventHandler(document, type, f_up)
   
   var type = 'ontouchstart' in window ? 'touchstart' : 'mousedown'
   if (XScroll.hasXScroll(el)) {
      addEventHandler(button1, type, function(event) {
         if (XScroll.timer) return
         XScroll.scrollLeft(this.parentNode, 40)
         XScroll.timer = setTimeout((function() {
            XScroll.cont = true
            XScroll.object = this.parentNode
            XScroll.private.scrollCont((function() { XScroll.scrollLeft(this.parentNode, 40) }).bind(this))
         }).bind(this), 450)
         cancelEvent(event)
      })
      addEventHandler(button2, type, function(event) {
         if (XScroll.timer) return
         XScroll.scrollRight(this.parentNode, 40)
         XScroll.timer = setTimeout((function() {
            XScroll.cont = true
            XScroll.object = this.parentNode
            XScroll.private.scrollCont((function() { XScroll.scrollRight(this.parentNode, 40) }).bind(this))
         }).bind(this), 450)
         cancelEvent(event)
      })
   } else {
      addEventHandler(button1, type, function(event) {
         if (XScroll.timer) return
         XScroll.scrollUp(this.parentNode, 40)
         XScroll.timer = setTimeout((function() {
            XScroll.cont = true
            XScroll.object = this.parentNode
            XScroll.private.scrollCont((function() { XScroll.scrollUp(this.parentNode, 40) }).bind(this))
         }).bind(this), 450)
         cancelEvent(event)
      })
      addEventHandler(button2, type, function(event) {
         if (XScroll.timer) return
         XScroll.scrollDown(this.parentNode, 40)
         XScroll.timer = setTimeout((function() {
            XScroll.cont = true
            XScroll.object = this.parentNode
            XScroll.private.scrollCont((function() { XScroll.scrollDown(this.parentNode, 40) }).bind(this))
         }).bind(this), 450)
         cancelEvent(event)
      })
   }

   if (tag == 'textarea') {
      addEventHandler(el.firstChild, 'input', function() {
         var x = XScroll.hasXScroll(this.parentNode)
         var y = XScroll.hasYScroll(this.parentNode)
         if (x && this.scrollWidth <= this.clientWidth ||
             y && this.scrollHeight <= this.clientHeight) {
            for (var i = 1; i < 4; i++) {
               this.parentNode.children[i].style.display = 'none'
            }
            if (x) {
               this.style.bottom = '0px'
               this.style.height = this.parentNode.clientHeight + 'px'
            }
            if (y) {
               this.style.right = '0px'
               this.style.width = this.parentNode.clientWidth + 'px'
            }
         } else {
            for (var i = 1; i < 4; i++) {
               this.parentNode.children[i].style.display = 'block'
            }
            var size = 10
            if (this.parentNode.getAttribute('scroll-size')) {
               size = Math.max(parseInt(this.parentNode.getAttribute('scroll-size')), 2)
            }
            if (x) {
               this.style.bottom = size + 'px'
               this.style.height = this.parentNode.clientHeight - size + 'px'
            }
            if (y) {
               this.style.right = size + 'px'
               this.style.width = this.parentNode.clientWidth - size + 'px'
            }
            XScroll.updateThumbPosition(this.parentNode)
         }
      })
      addEventHandler(el.firstChild, 'scroll', function() { XScroll.updateThumbPosition(this.parentNode) })
      Object.defineProperty(el, 'value', {
         get: function() {
            return this.firstChild && this.firstChild.value;
         },
         set: function(value) {
            if (this.firstChild && this.firstChild.value) {
               this.firstChild.value = value;
               XScroll.updateThumbPosition(this)
               if (this.firstChild.fireEvent) {
                  this.firstChild.fireEvent('oninput');
               } else if (this.firstChild.dispatchEvent) {
                  var event = document.createEvent('HTMLEvents');
                  event.initEvent('input', true, true);
                  this.firstChild.dispatchEvent(event);
               }
            }
         }
      });
   } else {
      addEventHandler(el.firstChild, 'DOMSubtreeModified', function () {
         XScroll.updateThumbPosition(this.parentNode);
      }, false);
   }

   if (!el.configured) {
      Object.defineProperty(el, 'scrollLeft', {
         get: function() {
            return XScroll.getXPosition(this);
         },
         set: function(value) {
            XScroll.scrollToX(this, value);
         }
      });

      Object.defineProperty(el, 'scrollTop', {
         get: function() {
            return XScroll.getYPosition(this);
         },
         set: function(value) {
            XScroll.scrollToY(this, value);
         }
      });
      
      Object.defineProperty(el, 'scrollHeight', {
         get: function() {
            return XScroll.getScrollHeight(this);
         },
         set: function(value) {
            return
         }
      });
   }
   
   el.configured = true

   var type = 'ontouchend' in window ? 'touchend' : 'mouseup'

   addEventHandler(button1, type, this.private.stopScroll)
   addEventHandler(button2, type, this.private.stopScroll)
   addEventHandler(button1, type, this.private.stopScroll)
   addEventHandler(button2, type, this.private.stopScroll)
   addEventHandler(button1, 'mouseout', this.private.stopScroll)
   addEventHandler(button2, 'mouseout', this.private.stopScroll)
   addEventHandler(button1, 'click', cancelEvent)
   addEventHandler(button2, 'click', cancelEvent)

   addEventHandler(track, 'mousedown', function(event) {
      var e = event || window.event
      if (XScroll.hasXScroll(this.parentNode)) {
         var pos = this.firstElementChild.getBoundingClientRect().left
         var x = -parseInt(this.parentNode.firstElementChild.style.left)
         delta = Math.round(this.parentNode.clientWidth * 0.1)
         if (e.clientX - window.scrollX > pos) {
            XScroll.scrollToX(this.parentNode, x+delta)
         } else {
            XScroll.scrollToX(this.parentNode, x-delta)
         }
      } else {
         var pos = this.firstElementChild.getBoundingClientRect().top
         var y = -parseInt(this.parentNode.firstElementChild.style.top)
         delta = this.parentNode.clientHeight
         if (e.clientY - window.scrollY > pos) {
            XScroll.scrollToY(this.parentNode, y+delta)
         } else {
            XScroll.scrollToY(this.parentNode, y-delta)
         }
      }
   })
   addEventHandler(track, 'click', cancelEvent)
   addEventHandler(thumb, 'click', cancelEvent)


   addWheelHandler(el, function(event) {
      var delta;
      event = event || window.event;

      if (event.wheelDelta) {
         delta = -event.wheelDelta / 120;
      }
      else if (event.detail) {
         delta = event.detail / 3;
      } else {
         delta = event.deltaY / 3;
      }

      try { if (event.preventDefault) event.preventDefault(); } catch(ex) {}
      event.returnValue = false;

      if (XScroll.hasXScroll(this)) {
         var x = XScroll.getXPosition(this)
         if (this.getAttribute('scroll-delta')) {
            x += delta * parseInt(this.getAttribute('scroll-delta'))
         } else {
            x += delta * 60
         }
         XScroll.scrollToX(this, x)
      } else {
         var y = XScroll.getYPosition(this)
         if (this.getAttribute('scroll-delta')) {
            y += delta * parseInt(this.getAttribute('scroll-delta'))
         } else {
            y += delta * 60
         }
         XScroll.scrollToY(this, y)
      }
   })
   this.updateThumbPosition(el)
   this.addTouchSupport(el)
}

XScroll.addListener = function(element, type, listener, obj) {
   if (element && !element.listeners) element.listeners = {}
   if (!element) var c = this.listeners
   else var c = element.listeners

   if (!obj) obj = element

   if (c[type] == undefined) c[type] = []
   var key = this.getKey()
   var fn = function() { listener.call(obj, XScroll.getXPosition(element), XScroll.getYPosition(element)) }
   c[type].push({"key": key, "listener": fn})

   return key
}

XScroll.removeListener = function(element, key, type) {
   if (key == null) return false;
   var c
   if (!player) c = this.listeners
   else c = element.listeners

   if (c == undefined) c = {}

   if (type == null) {
      for (var type in c) {
         for (var i = 0; i < c[type].length; i++) {
            if (c[type][i] == null) continue;
            if (c[type][i].key == key) {
               c[type][i] = null;
               return true;
            }
         }
      }
   } else {
      for (var i = 0; i < c[type].length; i++) {
         if (c[type][i] == null) continue;
         if (c[type][i].key == key) {
            c[type][i] = null;
            return true;
         }
      }
   }
   return false;
}

XScroll.lastEventFired = 0

XScroll.fireEvent = function(element, type) {
   if (+(new Date()) - this.lastEventFired < 200) return
   var args = Array.prototype.slice.call(arguments, 2)

   var c = element.listeners
   if (c && c[type] != undefined) {
      for (var i = 0; i < c[type].length; i++) {
         if (c[type][i] == null) continue;
         c[type][i].listener()
      }
   }

   var c = this.listeners
   if (c && c[type] != undefined) {
      for (var i = 0; i < c[type].length; i++) {
         if (c[type][i] == null) continue;
         c[type][i].listener.apply(null, args)
      }
   }
   
   element.dispatchEvent(new CustomEvent(type))
}

XScroll.getKey = function() {
   var result = ''
   for (var i = 0; i < 16; i++) {
      var n = Math.floor(Math.random() * 62)
      if (n < 26) {
          result += String.fromCharCode(n + 65)
      }
      if (n >= 26 && n < 52) {
         result += String.fromCharCode(n + 71)
      }
      if (n >= 52) {
         result += String.fromCharCode(n - 4)
      }
   }
   return result
}

XScroll.listeners = {}

XScroll.touch = {
   speed: [0, 0],
   a: 0.3,
   limit: 34,
   timer1: null,
   timer2: null,
   down: false,
   coords: [0, 0],
   delta: [0, 0],
   e: [0, 0],
   prevent: false
}

XScroll.addTouchSupport = function(el) {

   el.children[0].ontouchstart = function(event) {
      if (event.targetTouches && event.targetTouches.length) {
         event.clientX = event.targetTouches[0].clientX
         event.clientY = event.targetTouches[0].clientY
         if (event.preventDefault) {
            XScroll.touch.prevent = true
            if (el.hasAttribute('prevent-default-touch-action') || XScroll.touch.speed[0] != 0 || XScroll.touch.speed[1] != 0) {
               try { event.preventDefault() } catch (ex) {}
            }
         }
      }
      XScroll.object = this.parentNode
      XScroll.touch.down = true
      XScroll.touch.coords = [XScroll.getXPosition(XScroll.object), XScroll.getYPosition(XScroll.object)]
      XScroll.touch.e = [event.clientX, event.clientY]
      XScroll.touch.delta = [event.clientX + XScroll.getXPosition(XScroll.object), event.clientY + XScroll.getYPosition(XScroll.object)]
      if (!XScroll.touch.timer1) XScroll.touch.timer1 = setInterval(function() {
         if (!XScroll.touch.down) {
            var c = XScroll.object.children[0]
            var w = c.tagName.toLowerCase() != 'textarea' ? c.clientWidth : c.scrollWidth
            var h = c.tagName.toLowerCase() != 'textarea' ? c.clientHeight : c.scrollHeight
            if (XScroll.hasXScroll(XScroll.object)) XScroll.scrollToX(XScroll.object, Math.round(XScroll.getXPosition(XScroll.object) + XScroll.touch.speed[0]))
            if (XScroll.hasYScroll(XScroll.object)) XScroll.scrollToY(XScroll.object, Math.round(XScroll.getYPosition(XScroll.object) + XScroll.touch.speed[1]))
            if (XScroll.getXPosition(XScroll.object) == w) {
               XScroll.touch.speed[0] *= -0.2
               if (!XScroll.object.hasAttribute('touch-bounce')) XScroll.touch.speed[0] = 0
            }
            if (XScroll.getYPosition(XScroll.object) == h) {
               XScroll.touch.speed[1] *= -0.2
               if (!XScroll.object.hasAttribute('touch-bounce')) XScroll.touch.speed[1] = 0
            }
            if (XScroll.getXPosition(XScroll.object) == 0) {
               XScroll.touch.speed[0] *= -0.2
               if (!XScroll.object.hasAttribute('touch-bounce')) XScroll.touch.speed[0] = 0
            }
            if (XScroll.getYPosition(XScroll.object) == 0) {
               XScroll.touch.speed[1] *= -0.2
               if (!XScroll.object.hasAttribute('touch-bounce')) XScroll.touch.speed[1] = 0
            }
            var a = [XScroll.touch.a, XScroll.touch.a]
            if (Math.abs(XScroll.touch.speed[0]) < Math.abs(XScroll.touch.speed[1])) a[0] = a[1] * Math.abs(XScroll.touch.speed[0] / XScroll.touch.speed[1])
            if (Math.abs(XScroll.touch.speed[1]) < Math.abs(XScroll.touch.speed[0])) a[1] = a[0] * Math.abs(XScroll.touch.speed[1] / XScroll.touch.speed[0])
            var s = [XScroll.touch.speed[0], XScroll.touch.speed[1]]
            XScroll.touch.speed[0] = XScroll.touch.speed[0] - sign(XScroll.touch.speed[0]) * a[0]
            if (XScroll.touch.speed[0] * s[0] < 0) XScroll.touch.speed[0] = 0
            XScroll.touch.speed[1] = XScroll.touch.speed[1] - sign(XScroll.touch.speed[1]) * a[1]
            if (XScroll.touch.speed[1] * s[1] < 0) XScroll.touch.speed[1] = 0

            if (XScroll.touch.speed[0] == 0 && XScroll.touch.speed[1] == 0) {
               clearInterval(XScroll.touch.timer1)
               XScroll.fireEvent(XScroll.object, 'scrollend')
               XScroll.object = null
               XScroll.touch.prevent = false
               XScroll.touch.timer1 = null
            }
         }
      }, 30)
      XScroll.touch.timer2 = setInterval(function() {
         if (XScroll.touch.down) {
            var c = XScroll.object.children[0]
            XScroll.touch.speed = [Math.round((XScroll.getXPosition(XScroll.object) - XScroll.touch.coords[0]) / 2.75), Math.round((XScroll.getYPosition(XScroll.object) - XScroll.touch.coords[1]) / 2.75)]
            if (Math.abs(XScroll.touch.speed[0]) > XScroll.touch.limit) XScroll.touch.speed[0] = sign(XScroll.touch.speed[0]) * XScroll.touch.limit
            if (Math.abs(XScroll.touch.speed[1]) > XScroll.touch.limit) XScroll.touch.speed[1] = sign(XScroll.touch.speed[1]) * XScroll.touch.limit
            if (!XScroll.hasXScroll(XScroll.object)) XScroll.touch.speed[0] = 0
            if (!XScroll.hasYScroll(XScroll.object)) XScroll.touch.speed[1] = 0
            XScroll.touch.coords = [XScroll.getXPosition(XScroll.object), XScroll.getYPosition(XScroll.object)]
         }
      }, 80)
      try { event.preventDefault() } catch (ex) {}
   }
   document.ontouchmove = function(event) {
      if (XScroll.touch.down) {
         if (event.targetTouches && event.targetTouches.length) {
            event.clientX = event.targetTouches[0].clientX
            event.clientY = event.targetTouches[0].clientY
         }
         event.preventDefault()
         var x = XScroll.touch.delta[0] - event.clientX
         var y = XScroll.touch.delta[1] - event.clientY
         if (XScroll.hasXScroll(XScroll.object)) XScroll.scrollToX(XScroll.object, x)
         if (XScroll.hasYScroll(XScroll.object)) XScroll.scrollToY(XScroll.object, y)
         //var s = getSelection()
         //s.removeAllRanges()
      }
      try { event.preventDefault() } catch (ex) {}
   }
   document.ontouchend = function(event) {
      XScroll.touch.down = false
      clearInterval(XScroll.touch.timer2)
   }
   el.ontouchend = function(event) {
      if (event.targetTouches && event.targetTouches.length) {
         event.clientX = event.targetTouches[0].clientX
         event.clientY = event.targetTouches[0].clientY
      }
      if (XScroll.touch.down && (Math.abs(event.clientX - XScroll.touch.e[0]) >= 8 || Math.abs(event.clientY - XScroll.touch.e[1]) >= 8)) {
         var q = [2.75, 2.75]
         if (Math.abs(event.clientX - XScroll.touch.e[0]) < 20) q[0] = 0.75
         if (Math.abs(event.clientY - XScroll.touch.e[1]) < 20) q[1] = 0.75
         XScroll.touch.speed = [Math.round((XScroll.getXPosition(XScroll.object) - XScroll.touch.coords[0]) / q[0]), Math.round((XScroll.getYPosition(XScroll.object) - XScroll.touch.coords[1]) / q[1])]
         if (Math.abs(XScroll.touch.speed[0]) > XScroll.touch.limit) XScroll.touch.speed[0] = sign(XScroll.touch.speed[0]) * XScroll.touch.limit
         if (Math.abs(XScroll.touch.speed[1]) > XScroll.touch.limit) XScroll.touch.speed[1] = sign(XScroll.touch.speed[1]) * XScroll.touch.limit
         if (!XScroll.hasXScroll(XScroll.object)) XScroll.touch.speed[0] = 0
         if (!XScroll.hasYScroll(XScroll.object)) XScroll.touch.speed[1] = 0
         XScroll.touch.coords = [XScroll.getXPosition(XScroll.object), XScroll.getYPosition(XScroll.object)]
      }
      try { event.preventDefault() } catch (ex) {}
   }
   function sign(n) {
      if (n > 0) return 1
      else if (n < 0) return -1
      return 0
   }
   XScroll.processChildren(el)
}

XScroll.processChildren = function(el) {
   var ch = getChildrenRecursive(el.children[0]).slice(1)
   for (var i = 0; i < ch.length; i++) {
      addEventHandler(ch[i], 'touchstart', function(event) {
         if (XScroll.touch.prevent || event.target != this) return
         /*try {
            var e = document.createEvent('HTMLEvents')
            e.initEvent('click', true, true)
            this.dispatchEvent(e)
            event.preventDefault()
         } catch(ex) {
            if (this.onclick && this.onclick instanceof Function) this.onclick.call(this, { type: 'click', target: this })
         }*/
      })
   }
}

window.getChildrenRecursive = function(el) {
   var result = [el]
   for (var i = 0; i < el.children.length; i++) {
      result = result.concat(Array.prototype.slice.call(getChildrenRecursive(el.children[i])))
   }
   return result
}

if (!window.getElementsByClass) {
   window.getElementsByClass = function(searchClass, node, tag) {
      var result = new Array();
      if ( node == null )
         node = document;
      if ( tag == null )
         tag = '*';
      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;

      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (i = 0, j = 0; i < elsLen; i++) {
         if ( pattern.test(els[i].className) ) {
            result[j] = els[i];
            j++;
         }
      }
      return result;
   }
}

if (!window.addWheelHandler) {
   window.addWheelHandler = function(elem, func) {
      if (elem.addEventListener) {
         if ('onwheel' in document) {
            // IE9+, FF17+
            elem.addEventListener ("wheel", func, false);
         } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener ("mousewheel", func, false);
         } else {
             // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
             elem.addEventListener ("MozMousePixelScroll", func, false);
         }
       } else { // IE<9
          elem.attachEvent ("onmousewheel", func);
       }
   }
}

if (!window.cancelEvent) {
   window.cancelEvent = function(event) {
      var e = event || window.event
      if (e.stopPropagation) e.stopPropagation()
      else e.cancelBubble = true
      if (e.preventDefault) e.preventDefault()
      e.returnValue = false
   }
}

function cancelSelection() {
   XScroll.st = document.createElement('style')
   XScroll.st.innerText = '*::selection { background: rgba(0, 0, 0, 0); }'
   document.body.appendChild(XScroll.st)
}

function restoreSelection() {
   document.body.removeChild(XScroll.st)
   XScroll.st = null
}

function addEventHandler(obj, type, func) {
   if (document.addEventListener) obj.addEventListener(type, func, false)
   else obj.attachEvent('on' + type, func)
}