/**
 * Created by johnspurgin on 23/04/2018.
 */

(function(){
  document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    var blob = this.files[0];

    const BYTES_PER_SLICE = 1024 * 1024; // 1MB chunk sizes.
    const SIZE = blob.size;
    const NUM_SLICES = Math.round(SIZE / BYTES_PER_SLICE);

    var start = 0;
    var end = BYTES_PER_SLICE;
    var sliceNum = 1; // not zero based

    while(start < SIZE) {
      var slice = blob.slice(start, end);
      // add the slice number for other end
      //upload(slice, sliceNum);

      var worker = new Worker('doUpload.js');
      if (sliceNum >= NUM_SLICES) {
        worker.postMessage({data:slice, sliceNumber:sliceNum, message:'end'});
      } else {
        worker.postMessage({data:slice, sliceNumber:sliceNum, message:'continue'});
      }

      start = end;
      end = start + BYTES_PER_SLICE;
      count++;
    }
  }, false);

})();

