window.onload = function() {
  var audioElement = $('audio')[0];
  var equalizer = new D3MusicEqualizer();
  equalizer.create(audioElement, '#player');

  equalizer.analyserOptions({
    fftSize: 512,
    minDecibels: -87,
    smoothingTimeConstant: 0.8
  });

  equalizer.containerStyles({
    position: 'absolute',
    top: equalizer.containerHeight * -1,
    'z-index': 10000,
    'pointer-events': 'none'
  });

  equalizer.options({
    color: 'orange',
    opacity: 0.77,
    interval: 10,
    frequencyDataDivide: 2.3,
    barPadding: 1.7
  });

  equalizer.initialize();
  equalizer.render();

  // creating input field to

};
