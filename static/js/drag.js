var theObject = null

function ResizeObject () {
  this.el = null
  this.dir = ''
  this.grabx = null
  this.width = null
}

function getEl (el, className) {
  let temp = el
  while ((temp != null) && (temp.tagName !== 'body')) {
    if (temp.className === className) {
      el = temp
      return el
    }
    temp = temp.parentElement
  }
  return null
}

function getDirection (el) {
  let dir = ''
  let xPos = window.event.offsetX
  let clientX = window.event.clientX
  let offset = 8
  if (clientX < 200) return dir
  if (xPos < offset) dir += 'w'
  else if (xPos > el.offsetWidth - offset) dir += 'e'
  return dir
}

function doDown () {
  let el = getEl(event.srcElement, 'drag')
  if (el == null) {
    theObject = null
    return
  }
  let dir = getDirection(el)
  if (dir === '') return
  theObject = new ResizeObject()
  theObject.el = el
  theObject.dir = dir
  theObject.grabx = window.event.clientX
  theObject.width = el.offsetWidth
  window.event.returnValue = false
  window.event.cancelBubble = true
}

function doUp () {
  if (theObject != null) theObject = null
}

function doMove () {
  let el, str
  let xMin = 200
  let xMax = 400
  el = getEl(event.srcElement, 'drag')
  if (el == null) {
    theObject = null
    return
  }
  if (el.className === 'drag') {
    str = getDirection(el)
    if (str === '') str = 'default'
    else str += '-resize'
    el.style.cursor = str
  }
  if (theObject != null) {
    if (theObject.dir.includes('e')) {
      theObject.el.style.width = Math.max(xMin, theObject.width + window.event.clientX - theObject.grabx) + 'px'
      if ((theObject.width + window.event.clientX - theObject.grabx) > xMax) theObject.el.style.width = '400px'
    }
    if (theObject.dir.includes('w')) {
      theObject.el.style.width = Math.max(xMin, theObject.width - window.event.clientX + theObject.grabx) + 'px'
    }
  }
}
document.onmousedown = doDown
document.onmouseup = doUp
document.onmousemove = doMove
