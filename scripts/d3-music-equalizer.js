
function D3MusicEqualizer() {
  this.container = null;
  // add options for these later changing svgheight effects the position styling as well
  this.containerHeight = 700;
  this.containerWidth = 3000;
  this.barPadding = 1; // space between the bars

  this.interval = 20;
  this._intervalHandle = null;

  // equalizer cosmetic properties
  this.opacity = 1;
  this.color = null;

  this.isPlaying = false; // if rendering if on or false
  this.isInitalized = false;

  // web audio api variables
  this._context = null; // new AudioContext
  this._element = null; // audio tag or stream
  this._source = null; // audio source
  this.analyser = null; // analyser node that writes frequencyData
  this.frequencyData = null; // sync frequencyData 8bit or 32bit array to D3Music
  // this.frequencyDataDivide = 4;

  this.options = function(options) {
    for (var key in options) {
      this[key] = options[key];
    }
  };

  // options that target this.analyser
  this.analyserOptions = function(options) {
    for (var key in options) {
      this.analyser[key] = options[key];
    }
  };

  this.containerStyles = function(options) {
    for (var key in options) {
      this.container.style(key, options[key]);
    }
  };

  // generate web audio api and creates svg container for equalizer
  this.create = function(audioElement, parent) {
    console.log('create');
    // web audio related
    this._context = new AudioContext();
    this._element = audioElement;
    this._source = this._context.createMediaElementSource(this._element);
    this.analyser = this._context.createAnalyser();

    // d3 equalizer related
    this.container = d3.select(parent).append('svg').attr('height', this.containerHeight).attr('width', this.containerWidth);
  };

  // allows rebinding of audio analyser and frequencyData
  // this will require a re initialization
  this.bind = function(analyser, frequencyData) {
    this.analyser = analyser;
    this.frequencyData = frequencyData;
  };

  // creates all the equalizer elements to be manipulated and sets up audio connects and
  // freq data array
  this.initialize = function() {
    console.log('initialized');
    this.isInitalized = true;

    this._source.connect(this.analyser);
    this._source.connect(this._context.destination);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount/this.frequencyDataDivide);

    this.container
      .selectAll('rect')
      .data(this.frequencyData)
      .enter()
      .append('rect')
      .attr('x',(d, i) => {
        return i * (this.containerWidth / this.frequencyData.length);
      })
      .attr('width', this.containerWidth / this.frequencyData.length - this.barPadding);
  };

  this.render = function() {
    console.log('render start');
    this.isPlaying = true;
    function render() {
      this.analyser.getByteFrequencyData(this.frequencyData); // now frequencyData array has
      this.container.selectAll('rect')
        .data(this.frequencyData)
        .attr('y', (d) => {
          return this.containerHeight - d;
        })
        .attr('height', (d) => {
          return d/225 * 80 + d/225 * 500;
        })
        .attr('opacity', (d) => {
          return this.opacity;
        })
        .attr('transition', (d) => {
          return 0.3;
        })
        .attr('fill', (d) => {
          if (this.color === 'purple') {
            return 'rgb(' + d +  ',' + 30 + ',' + 200 + ')';
          } else if (this.color === 'green') {
            return 'rgb(' + 100 +  ',' + 200 + ',' + d + ')';
          } else if (this.color === 'neon') {
            return 'rgb(' + (d + 50) +  ',' + 255 + ',' + 0 + ')';
          } else if (this.color === 'red') {
            return 'rgb(' + (255 - d) +  ',' + 0 + ',' + 0 + ')';
          } else if ('orange') {
            return "hsl(" + (3 + d / 255 * 5 + d / 255 * 47) + ",95%,55%)";
          } else if ('random') {
            return "hsl(" + (Math.random() * 360) + ",100%,50%)";
          } else {
            // orange by default
            return "hsl(" + (10 + d / 255 * 50) + ",95%,55%)";
          }
        })
        .style('border-top', '5px solid black');
    }

    this._intervalHandle = setInterval(render.bind(this), this.interval);
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
      clearInterval(this._intervalHandle);
      this._intervalHandle = null;
      this.isPlaying = false;
    }
  };

  this.resume = function() {
    if (this.isPlaying === false && this.isInitalized === true) {
      this.render();
    }
  };

  this.remove = function() {
    clearInterval(this._intervalHandle);
    this.container.remove();
  };

}
