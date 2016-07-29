// imports D3MusicEqualizer from d3-music-equalizer
// imports d3
// imports jquery

window.onload = function() {
  // EQUALIZER INITIALIZATION AND RENDER START
  var audioElement = $('audio')[0];
  var equalizer = new D3MusicEqualizer();
  equalizer.create(audioElement, '#player');

  // refer to d3-music-equalizer for options meaning
  equalizer.analyserOptions({
    fftSize: 2048,
    minDecibels: -87,
    smoothingTimeConstant: 0.8
  });

  equalizer.containerStyles({
    position: 'absolute',
    top: equalizer.containerHeight * -1,
    left: 0,
    'z-index': 10000,
    'pointer-events': 'none'
  });

  equalizer.options({
    color: 'orange',
    opacity: 0.7,
    interval: 50,
    frequencyDataDivide: 12,
    barPadding: 1.7
  });

  equalizer.initialize();
  equalizer.render();


  /* ################################### */

  // GOOGLE MUSIC BUTTON DISPLAY
  var buttonContainer = $('<div></div>');
  buttonContainer.appendTo('#player');
  buttonContainer.css({
    display: 'flex',
    flexFlow: 'row',
    height: '22px',
    position: 'absolute',
    top: '67px',
    left: '100px',
    zIndex: 10000,
    border: '1px solid #d3d3d3',
    outline: 'none',
    textAlign: 'center',
    boxSizing: 'border-box',
    color: '#FB7B62', // initial color of display words. changes with colorArr
    backgroundColor: '#FB7B62',
    fontFamily: 'Roboto, arial',
    fontSize: '13px',
    userSelect: 'none' // no text highlighting
  });

  // NAME
  var equalizerName = $('<div>equalizer</div>');
  equalizerName.appendTo(buttonContainer);
  equalizerName.css({
    height: '100%',
    outline: 'none',
    cursor: 'pointer',
    paddingLeft: '5px',
    paddingTop: '2px',
    paddingRight: '3px',
    textAlign: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF'
  });

  // COLOR CHANGE BUTTON
  var colorChange = $('<div>orange</div>');
  colorChange.appendTo(buttonContainer);
  colorChange.css({
    height: '100%',
    width: '65px',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: '2px',
    marginRight: '22px',
    borderRight: '1px solid #d3d3d3',
    backgroundColor: '#FFFFFF'
  });

  // OFF EQUALIZER BUTTON
  var off = $('<div>off</div>');
  off.appendTo(buttonContainer);
  off.css({
    height: '100%',
    width: '35px',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingTop: '2px',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderLeft: '1px solid #d3d3d3',
    backgroundColor: '#FFFFFF'
  });

  // array of all the colors in D3MusicEqualizer. iterate thru this with each
  // click to display a different color
  var colorsIndex = 0;
  var colorsArr = [
    ['green', '#5AE535'],
    ['blue', '#5CD1F8'],
    ['purple', '#FB628E'],
    ['red', '#D60401'],
    ['orange', '#FF5722']
  ];


  function colorToggle() {
    console.log(this);
    // change color of equalizer
    equalizer.setColor(colorsArr[colorsIndex][0]);
    // change text color of the display container and background color
    buttonContainer.css({
      color: colorsArr[colorsIndex][1],
      backgroundColor: colorsArr[colorsIndex][1]
    });
    // change color of google music progress bar
    $('#primaryProgress').css({
      background: colorsArr[colorsIndex][1]
    });
    $('#sliderKnobInner').css({
      backgroundColor: colorsArr[colorsIndex][1],
      borderColor: colorsArr[colorsIndex][1]
    });
    // change color of icon
    $('#player-bar-play-pause').css({
      color: colorsArr[colorsIndex][1]
    });
    colorChange.text(colorsArr[colorsIndex][0]);
    if (colorsIndex === colorsArr.length - 1) {
      colorsIndex = 0;
    } else {
      colorsIndex++;
    }
  }

  colorChange.on('click', colorToggle);
  equalizerName.on('click', colorToggle);
  // removes traces of equalizer
  var isOn = false;
  off.on('click', function() {
    if (isOn === false) {
      isOn = true;
      equalizer.stop();
      off.text('on');
    } else {
      isOn = false;
      equalizer.start();
      off.text('off');
    }
  });
};
