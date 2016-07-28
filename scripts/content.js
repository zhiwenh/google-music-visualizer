window.onload = function() {
  console.log('loaded');
  var audioElement = $('audio')[0];

  console.log(audioElement);
  setInterval(function() {
    console.log(audioElement);
  }, 2000);


  var equalizer = new D3MusicFrequency();

  equalizer.create(audioElement, 'body');
  equalizer.opacity(1);
  equalizer.interval(15);
  equalizer.initialize();
  equalizer.color('green');
  equalizer.render();
};
