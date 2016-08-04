// imports D3MusicEqualizer from d3-music-equalizer
// imports d3
// imports jquery

window.onload = function() {
  // EQUALIZER INITIALIZATION AND RENDER START
  var audioElement = $('audio')[0];
  console.log(audioElement);
  var equalizer = new D3MusicEqualizer();
  equalizer.create(audioElement, '#player');

  // refer to d3-music-equalizer for options meaning
  equalizer.analyserOptions({
    fftSize: 2048,
    minDecibels: -87,
    maxDecibels: -3,
    smoothingTimeConstant: 0.83
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
    interval: 30,
    frequencyDataDivide: 9,
    barPadding: 1.7
  });

  equalizer.initialize();
  equalizer.start();


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
    userSelect: 'none', // no text highlighting
    borderRadius: '2px'
  });

  var cssDefaults = {
    textAlign: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    height: '100%',
    outline: 'none',
    cursor: 'pointer',
  };
  // NAME
  var equalizerName = $('<div>visualization</div>');
  equalizerName.appendTo(buttonContainer);
  equalizerName.css(cssDefaults);
  equalizerName.css({
    paddingLeft: '5px',
    paddingTop: '2px',
    paddingRight: '3px',
  });

  // COLOR CHANGE BUTTON
  var colorChange = $('<div>orange</div>');
  colorChange.appendTo(buttonContainer);
  colorChange.css(cssDefaults);
  colorChange.css({
    width: '65px',
    paddingTop: '2px',
    marginRight: '22px',
    borderRight: '1px solid #d3d3d3',
  });

  // SPEED BUTTONS
  var speedButtons = [];
  for (var i = 0; i < 3; i++) {
    var speedButton;
    if (i === 0) {
      speedButton = $('<div>-</div>');
    } else if (i === 2) {
      speedButton = $('<div>+</div>');
    } else {
      speedButton = $('<div></div>');
    }
    speedButton.appendTo(buttonContainer);
    speedButton.css(cssDefaults);
    speedButton.css({
      width: '30px',
      paddingTop: '3px',
      borderRight: '1px solid #d3d3d3',
      borderLeft: '1px solid #d3d3d3'
    });
    speedButtons.push(speedButton);
  }
  speedButtons[1].text(Math.floor(1000 / equalizer.getInterval()) + ' Hz');
  speedButtons[1].css({
    cursor: 'default',
    backgroundColor: 'white',
    width: '47px'
  });
  speedButtons[2].css({
    marginRight: '22px'
  });

  // HEIGHT BUTTONS
  var heightButtons = [];
  for (i = 0; i < 3; i++) {
    var heightButton;
    if (i === 0) {
      heightButton = $('<div>-</div>');
    } else if (i === 2) {
      heightButton = $('<div>+</div>');
    } else {
      heightButton = $('<div></div>');
    }
    heightButton.appendTo(buttonContainer);
    heightButton.css(cssDefaults);
    heightButton.css({
      width: '30px',
      paddingTop: '3px',
      borderRight: '1px solid #d3d3d3',
      borderLeft: '1px solid #d3d3d3'
    });
    heightButtons.push(heightButton);
  }
  heightButtons[1].text(equalizer.getBarHeightScale() + 'x');
  heightButtons[1].css({
    cursor: 'default',
    backgroundColor: 'white',
    width: '35px'
  });
  heightButtons[2].css({
    marginRight: '22px'
  });

  // OFF EQUALIZER BUTTON
  var off = $('<div>off</div>');
  off.appendTo(buttonContainer);
  off.css(cssDefaults);
  off.css({
    width: '35px',
    paddingTop: '2px',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderLeft: '1px solid #d3d3d3',
  });



  // array of all the colors in D3MusicEqualizer. iterate thru this with each
  // click to display a different color
  var colorsIndex = 0;
  var colorsArr = [
    ['green', '#5AE535'],
    ['blue', '#5CD1F8'],
    ['purple', '#FB628E'],
    ['red', '#D60401'],
    ['gray', '#BDBDBD'],
    ['orange', '#FF5722']
  ];

  // toggles the different color themes
  function colorToggle() {
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
    // change color of top toolbar
    $('#material-app-bar').css({
      background: colorsArr[colorsIndex][1]
    });
    // $('#middleBar').css({
    //   background: colorsArr[colorsIndex][1]
    // });
    // $('#material-one-left').css({
    //   color: 'white'
    // });
    // $('#browse-stations-tabs').css({
    //   background: colorsArr[colorsIndex][1]
    // });

    // changes colors of buttons
    // not good enough to be used
    // $('paper-fab').css({
    //   background: colorsArr[colorsIndex][1]
    // });
    // $('paper-button').each(function() {
    //   $(this).css({
    //     backgroundColor: colorsArr[colorsIndex][1]
    //   });
    // });
    colorChange.text(colorsArr[colorsIndex][0]);
    if (colorsIndex === colorsArr.length - 1) {
      colorsIndex = 0;
    } else {
      colorsIndex++;
    }
  }

  colorChange.on('click', colorToggle);
  equalizerName.on('click', colorToggle);

  // slow down
  speedButtons[0].on('click', function() {
    if (equalizer.getInterval() < 100) {
      equalizer.slower(5);
      speedButtons[1].text(Math.floor(1000 / equalizer.getInterval()) + ' Hz');
    }
  });
  // speed up
  speedButtons[2].on('click', function() {
    if (equalizer.getInterval() > 5) {
      equalizer.faster(5);
      speedButtons[1].text(Math.floor(1000 / equalizer.getInterval()) + ' Hz');
    }
  });

  // height decrease
  heightButtons[0].on('click', function() {
    var barHeightScale = equalizer.getBarHeightScale();
    if (barHeightScale > 0.1) {
      barHeightScale -= 0.1;
      equalizer.setBarHeightScale(barHeightScale);
      heightButtons[1].text(barHeightScale.toFixed(1)+ 'x');
    }
  });
  // height increase
  heightButtons[2].on('click', function() {
    var barHeightScale = equalizer.getBarHeightScale();
    if (barHeightScale < 2) {
      barHeightScale += 0.1;
      equalizer.setBarHeightScale(barHeightScale);
      heightButtons[1].text(barHeightScale.toFixed(1) + 'x');
    }
  });

  // ON/OFF
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
