var theObject = null

function ResizeObject () {
  this.el = null
  this.grabx = null
  this.width = null
}

function doDown () {
  if (event.srcElement.id !== 'resizebar') return
  theObject = new ResizeObject()
  theObject.el = document.getElementById('star-list')
  theObject.grabx = window.event.clientX
  theObject.width = theObject.el.offsetWidth
  window.event.returnValue = false
  window.event.cancelBubble = true
}

function doUp () {
  if (!Object.is(theObject, null)) theObject = null
}

function doMove () {
  if (Object.is(theObject, null)) return
  if (window.event.clientX > 600) return
  let xMin = 250
  theObject.el.style.width = Math.max(xMin, theObject.width + window.event.clientX - theObject.grabx) + 'px'
  window.event.returnValue = false
  window.event.cancelBubble = true
}

document.onmousedown = doDown
document.onmouseup = doUp
document.onmousemove = doMove
