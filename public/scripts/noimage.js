document.addEventListener('error', function (event) {
  var elm = event.target;
  if (elm.tagName == 'IMG') {
    elm.src = "/image/noimage.png";
  }
}, true)