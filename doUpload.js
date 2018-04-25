/**
 * Created by johnspurgin on 24/04/2018.
 */
self.addEventListener('message', function(e) {
  var data = e.data;
  var sliceNumber = e.sliceNumber;
  var message = e.message;

  // post the data via HTTP

  // or via web socket

}, false);