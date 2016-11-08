;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="k-previous" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M718.598 221.899c19.421-19.426 19.421-50.924 0-70.336l-8.791-8.802c-19.42-19.416-50.908-19.416-70.334 0l-334.070 334.083c-19.421 19.413-19.421 50.896 0 70.322l334.070 334.068c19.425 19.426 50.914 19.426 70.334 0l8.791-8.789c19.421-19.413 19.421-50.908 0-70.334l-290.118-290.107 290.118-290.103z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="k-next" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M305.402 802.101c-19.421 19.426-19.421 50.924 0 70.336l8.791 8.802c19.42 19.416 50.908 19.416 70.334 0l334.070-334.083c19.421-19.413 19.421-50.896 0-70.322l-334.070-334.068c-19.425-19.426-50.914-19.426-70.334 0l-8.791 8.789c-19.421 19.413-19.421 50.908 0 70.334l290.118 290.107-290.118 290.103z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
