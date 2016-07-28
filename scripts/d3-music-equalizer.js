
function D3MusicFrequency() {
  this.mainSvg = null;
  this.mainSvgHeight = 300; // add options for these later
  this.mainSvgWidth = 1000;
  this.barPadding = '1';

  this.interval = 10;
  this.intervalHandle = null;

  // equalizer cosmetic properties
  this.opacity = 1;
  this.color = null;

  this.isPlaying = false; // if rendering if on or false
  this.isInitalized = false;

  // web audio api variables
  this.context = null; // new AudioContext
  this.element = null; // audio tag or stream
  this.source = null;
  this.analyser = null; // analyser node that writes frequencyData
  this.frequencyData = null; // sync frequencyData 8bit or 32bit array to D3Music

  // generate web audio api and creates svg container for equalizer
  this.create = function(audioElement, parent) {
    console.log('create');
    // web audio related
    this.context = new AudioContext();
    this.element = audioElement;
    this.source = this.context.createMediaElementSource(this.element);
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 2048; // default size. add options to change later
    this.analyser.minDecibels = -95;
    this.analyser.smoothingTimeConstant = 0.85;
    this.source.connect(this.analyser);
    this.source.connect(this.context.destination);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount/8);

    // d3 equalizer related
    this.mainSvg = d3.select(parent).append('svg').attr('height', this.mainSvgHeight).attr('width', this.mainSvgWidth);
  };

  // allows rebinding of audio analyser and frequencyData
  this.bind = function(analyser, frequencyData) {
    this.analyser = analyser;
    this.frequencyData = frequencyData;
  };

  // creates all the elements that will be manipulated
  this.initialize = function() {
    console.log('initialize');
    this.isInitalized = true;
    this.mainSvg
      .selectAll('rect')
      .data(this.frequencyData)
      .enter()
      .append('rect')
      .attr('x',(d, i) => {
        return i * (this.mainSvgWidth / this.frequencyData.length);
      })
      .attr('width', this.mainSvgWidth / this.frequencyData.length - this.barPadding);
  };

  this.render = function() {
    console.log('render start');
    this.isPlaying = true;
    function render() {
      this.analyser.getByteFrequencyData(this.frequencyData); // now frequencyData array has
      this.mainSvg.selectAll('rect')
        .data(this.frequencyData)
        .attr('y', (d) => {
          return this.mainSvgHeight - d;
        })
        .attr('height', (d) => {
          return d;
        })
        .attr('opacity', (d) => {
          return this.opacity;
        })
        .attr('transition', (d) => {
          return 0.3;
        })
        .attr('fill', (d) => {
          if (this.color === 'purple') {

          } else if (this.color === 'lightPurple') {
            return 'rgb(' + d +  ',' + 40 + ',' + 150 + ')';
          } else if (this.color === 'green') {
            return 'rgb(' + 100 +  ',' + 200 + ',' + d + ')';
          } else if (this.color === 'greenPink') {
            return 'rgb(' + 255 - d +  ',' + 0 + ',' + 0 + ')';
          } else if (this.color === 'neonYellow') {
            return 'rgb(' + (d + 50) +  ',' + 255 + ',' + 0 + ')';
          } else if (this.color === 'blackRed') {
            return 'rgb(' + (d + 50) +  ',' + 0 + ',' + 0 + ')';
          } else if (this.color === 'redBlack') {
            return 'rgb(' + (255 - d) +  ',' + 0 + ',' + 0 + ')';
          } else if (this.color === 'orange') {
            return 'rgb(' + Math.floor( d * 0.6 + 70) +  ',' + 120 + ',' + Math.floor(0) + ')';
          } else if (this.color === 'darkPurple') {
            return 'rgb(' + Math.floor( d * 0.90 + 70)  +  ',' + 40 + ',' + 255 + ')';
          } else {
            // purple by default
            return 'rgb(' + d +  ',' + 30 + ',' + 200 + ')';
          }
        });
    }

    this.intervalHandle = setInterval(render.bind(this), this.interval);
  };

  this.opacity = function(opacity) {
    this.opacity = opacity;
  };

  this.color = function(color) {
    this.color = color;
  };
  // doesnt allow you to change intervals after d3 is rendered;
  // will need a pause and a resume
  this.interval = function(interval) {
    this.interval = interval;
  };
  // speeds up the interval
  this.faster = function(increase) {
    this.pause();
    console.log(this.interval);
    this.interval -= increase;
    this.resume();
  };

  // slows down the interval
  this.slower = function(decrease) {
    this.pause();
    console.log(this.interval);
    this.interval += decrease;
    this.resume();
  };

  // resume and pause has a bug where if you pause the audio it stops working
  this.pause = function() {
    if (this.isPlaying === true) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
      this.isPlaying = false;
    }
  };

  this.resume = function() {
    if (this.isPlaying === false && this.isInitalized === true) {
      this.render();
    }
  };

  this.remove = function() {
    clearInterval(this.intervalHandle);
    this.mainSvg.remove();
  };

}
