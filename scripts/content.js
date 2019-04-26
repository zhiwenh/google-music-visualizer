// imports AudioVisualizer from visualizer.js
// imports d3
// imports jquery

window.onload = function() {
  console.log('Google Music Visualizer v 1.2.1 - by Zhiwen Huang');
  /** Looks for audio element after a second then intervals of half seconds */
  setTimeout(function() {
    var findAudioInterval = setInterval(function() {
      findAudio();
    }, 500);
    findAudio();

    function findAudio() {
      var $audio = $('audio');

      if ($audio.length > 1) {
        clearInterval(findAudioInterval);
        $audio = $audio.filter('[src ^= "blob"]');
        var audioElement = $audio[0];
        startUp(audioElement);
      }
    }
  }, 1000);

  /** Called after audio element is found */
  function startUp(audioElement) {
    // VISUALIZER INITIALIZATION AND RENDER START
    var visualizer = new AudioVisualizer();

    visualizer.options({
      color: 'orange',
      opacity: 0.7,
      interval: 30,
      frequencyDataDivide: 9,
      barPadding: 1.7,
      barWidth: 25,
      containerWidth: $(window).width()
    });

    visualizer.create(audioElement, '#player');

    // refer to visualizer for options meaning
    visualizer.analyserOptions({
      fftSize: 2048,
      minDecibels: -87,
      maxDecibels: -3,
      smoothingTimeConstant: 0.83
    });

    visualizer.containerStyles({
      position: 'absolute',
      top: visualizer.containerHeight * -1,
      left: 0,
      'z-index': 10000,
      'pointer-events': 'none'
    });

    visualizer.initialize();
    visualizer.start();

    $(window).resize(function() {
      console.log($(window).width());
      visualizer.setContainerWidth($(window).width())
    });

    /* ################################### */
    // GOOGLE MUSIC BUTTON DISPLAY
    /* ################################### */

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
      // border: '1px solid #d3d3d3',
      outline: 'none',
      textAlign: 'center',
      boxSizing: 'border-box',
      color: '#FB7B62', // initial color of display words. changes with colorArr
      // backgroundColor: '#FB7B62',
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

    /* ################################### */
    // NAME
    /* ################################### */
    var visualizerName = $('<div>visualizer options</div>');
    visualizerName.appendTo(buttonContainer);
    visualizerName.css(cssDefaults);
    visualizerName.css({
      paddingLeft: '5px',
      paddingTop: '2px',
      paddingRight: '3px',
      width: '130px',
      border: '1px solid #d3d3d3'
    });

    /* ################################### */
    // CONTAINER FOR OPTIONS
    /* ################################### */
    var optionsContainer = $('<div></div>');
    optionsContainer.appendTo(buttonContainer);
    optionsContainer.css(cssDefaults);
    optionsContainer.css({
      display: 'flex',
      flexFlow: 'row',
      backgroundColor: '#FB7B62',
      border: '1px solid #d3d3d3',
      borderLeft: '0px'
    });


    /* ################################### */
    // COLOR CHANGE BUTTON
    /* ################################### */
    var colorChange = $('<div>theme orange</div>');
    colorChange.appendTo(optionsContainer);
    colorChange.css(cssDefaults);
    colorChange.css({
      width: '100px',
      paddingTop: '2px',
      marginRight: '22px',
      marginLeft: '22px',
      borderRight: '1px solid #d3d3d3'
    });

    /* ################################### */
    // SPEED BUTTONS
    /* ################################### */
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
      speedButton.appendTo(optionsContainer);
      speedButton.css(cssDefaults);
      speedButton.css({
        width: '30px',
        paddingTop: '3px',
        borderRight: '1px solid #d3d3d3',
        borderLeft: '1px solid #d3d3d3'
      });
      speedButtons.push(speedButton);
    }
    speedButtons[1].text(Math.floor(1000 / visualizer.getInterval()) + ' Hz');
    speedButtons[1].css({
      cursor: 'default',
      backgroundColor: 'white',
      width: '47px'
    });
    speedButtons[2].css({
      marginRight: '22px'
    });

    /* ################################### */
    // HEIGHT BUTTONS
    /* ################################### */
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
      heightButton.appendTo(optionsContainer);
      heightButton.css(cssDefaults);
      heightButton.css({
        width: '30px',
        paddingTop: '3px',
        borderRight: '1px solid #d3d3d3',
        borderLeft: '1px solid #d3d3d3'
      });
      heightButtons.push(heightButton);
    }
    heightButtons[1].text(visualizer.getBarHeightScale() + 'x');
    heightButtons[1].css({
      cursor: 'default',
      backgroundColor: 'white',
      width: '35px'
    });
    heightButtons[2].css({
      marginRight: '22px'
    });

    /* ################################### */
    // BAR WIDTH BUTTONS
    /* ################################### */
    var barWidthButtons = [];
    for (i = 0; i < 3; i++) {
      var barWidthButton;
      if (i === 0) {
        barWidthButton = $('<div>-</div>');
      } else if (i === 2) {
        barWidthButton = $('<div>+</div>');
      } else {
        barWidthButton = $('<div></div>');
      }
      barWidthButton.appendTo(optionsContainer);
      barWidthButton.css(cssDefaults);
      barWidthButton.css({
        width: '30px',
        paddingTop: '3px',
        borderRight: '1px solid #d3d3d3',
        borderLeft: '1px solid #d3d3d3'
      });
      barWidthButtons.push(barWidthButton);
    }
    barWidthButtons[1].text(visualizer.getBarWidth() + 'px');
    barWidthButtons[1].css({
      cursor: 'default',
      backgroundColor: 'white',
      width: '40px'
    });
    barWidthButtons[2].css({
      marginRight: '22px'
    });

    /* ################################### */
    // MODE visualizer BUTTON
    /* ################################### */
    var mode = $('<div>mode</div>');
    mode.appendTo(optionsContainer);
    mode.css(cssDefaults);
    mode.css({
      width: '50px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      borderLeft: '1px solid #d3d3d3',
      marginRight: '22px'
    });

    /* ################################### */
    // OFF visualizer BUTTON
    /* ################################### */
    var off = $('<div>off</div>');
    off.appendTo(optionsContainer);
    off.css(cssDefaults);
    off.css({
      width: '35px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      borderLeft: '1px solid #d3d3d3'
    });

    // Options show and hide
    var optionsHidden = true;
    function optionsToggle() {
      if (optionsHidden === false) {
        $(optionsContainer).hide('slide', {direction: 'left'}, 600);
        optionsHidden = true;
      } else {
        $(optionsContainer).show('slide', {direction: 'left'}, 600);
        optionsHidden = false;
      }
    }

    $(optionsContainer).hide();
    visualizerName.on('click', optionsToggle)

    // array of all the colors in AudioVisualizer. iterate thru this with each
    // click to display a different color
    var colorsIndex = 0;
    var colorsArr = [
      ['orange', '#FF5722'],
      ['green', '#4FD55A'],
      ['blue', '#5CD1F8'],
      ['purple', '#FB628E'],
      ['red', '#D60401'],
      ['gray', '#BDBDBD'],
    ];

    // toggles the different color themes
    function colorToggle() {
      if (colorsIndex === colorsArr.length - 1) {
        colorsIndex = 0;
      } else {
        colorsIndex++;
      }
      colorChange.text('theme ' + colorsArr[colorsIndex][0]);

      // change color of visualizer
      visualizer.setColor(colorsArr[colorsIndex][0]);
      // change text color of the display container and background color
      buttonContainer.css({
        color: colorsArr[colorsIndex][1],
      });

      optionsContainer.css({
        color: colorsArr[colorsIndex][1],
        backgroundColor: colorsArr[colorsIndex][1]
      });

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

      $('#progressContainer').css({
        backgroundColor: colorsArr[colorsIndex][1]
      });

      $('#sliderKnob').css({
        color: colorsArr[colorsIndex][1]
      });

      $('.slider-knob-inner').css({
        backgroundColor: colorsArr[colorsIndex][1],
        borderColor: colorsArr[colorsIndex][1],
        color: colorsArr[colorsIndex][1]
      });
    }

    colorChange.on('click', colorToggle);

    // slow down
    speedButtons[0].on('click', function() {
      if (visualizer.getInterval() < 100) {
        visualizer.slower(5);
        speedButtons[1].text(Math.floor(1000 / visualizer.getInterval()) + ' Hz');
      }
    });

    // speed up
    speedButtons[2].on('click', function() {
      if (visualizer.getInterval() > 5) {
        visualizer.faster(5);
        speedButtons[1].text(Math.floor(1000 / visualizer.getInterval()) + ' Hz');
      }
    });

    // height decrease
    heightButtons[0].on('click', function() {
      var barHeightScale = visualizer.getBarHeightScale();
      if (barHeightScale > 0.1) {
        barHeightScale -= 0.1;
        visualizer.setBarHeightScale(barHeightScale);
        heightButtons[1].text(barHeightScale.toFixed(1)+ 'x');
      }
    });

    // height increase
    heightButtons[2].on('click', function() {
      var barHeightScale = visualizer.getBarHeightScale();
      if (barHeightScale < 2) {
        barHeightScale += 0.1;
        visualizer.setBarHeightScale(barHeightScale);
        heightButtons[1].text(barHeightScale.toFixed(1) + 'x');
      }
    });

    // bar width decrease
    barWidthButtons[0].on('click', function() {
      var barWidth = visualizer.getBarWidth();
      if (barWidth > 15) {
        barWidth -= 1;
        visualizer.setBarWidth(barWidth);
        barWidthButtons[1].text(barWidth + 'px');
      }
    });

    // bar width increase
    barWidthButtons[2].on('click', function() {
      var barWidth = visualizer.getBarWidth();
      if (barWidth < 50) {
        barWidth += 1;
        visualizer.setBarWidth(barWidth);
        barWidthButtons[1].text(barWidth + 'px');
      }
    });

    // ON/OFF
    var isOn = false;
    off.on('click', function() {
      if (isOn === false) {
        isOn = true;
        visualizer.stop();
        off.text('on');
      } else {
        isOn = false;
        visualizer.start();
        off.text('off');
      }
    });

    var whatMode = 'player';
    mode.on('click', function() {
      $mainContainer = $('#mainContainer');
      if (whatMode === 'player') {
        $mainContainer.hide('fast');
        whatMode = 'audio';
      } else {
        $mainContainer.show('fast');
        whatMode = 'player';
      }
    });
  }

};
