navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var streamContext = new AudioContext();

function success(stream) {
  window.stream = stream;
  var micSource = streamContext.createMediaStreamSource(stream);
  var micAnalyser = streamContext.createAnalyser();

  micSource.connect(micAnalyser);

  var frequencyArray = new Uint8Array(micAnalyser.frequencyBinCount);

  var parent = 'body';
  var width = 1000;
  var height = 300;
  var padding = 2;
  var svg = d3.select(parent).append('svg').attr('height', height).attr('width', width);
  svg
    .selectAll('rect')
    .data(frequencyArray)
    .enter()
    .append('rect')
    .attr('x',(d, i) => {
      return i * (1000 / frequencyArray.length);
    })
    .attr('width', width / frequencyArray.length - padding);
  }

  function render() {
    micAnalyser.getByteFrequencyData(frequencyArray);
    svg.selectAll('rect')
      .data(frequencyArray)
      .attr('y', (d) => {
        return height - d;
      })
      .attr('height', (d) => {
        return d;
      });
  }
  render();
  setInterval(render(), 15);
}
function error(error) {
}

navigator.getUserMedia({video: false, audio: true}, success, error);
