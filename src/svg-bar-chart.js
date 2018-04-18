(function (app) {
  var BarChart = function () {
    // TODO: add error checking

    // TODO: convert defaults to object
    this.color = '#abc';
    this.bars = [];
    this.dataset;
    this.graphHolder;
    this.min;
    this.max;

    this.svgObj = {
      open: '<svg x="0" y="0" width="',
      openSecond: '" height="100" viewBox="0, 0, ',
      openThird: ', 100" style="border: 1px solid #aaa;">',
      // rect1: '<rect x="10" y="125" width="20" height="175" style="fill:red;" />',
      close: '</svg>'
    };

    this.rectObj = {
      open: '<rect ',
      x: 'x="',
      y: '" y="',
      width: '" width="10" ',
      height: 'height="',
      style: '" style="fill:' + this.color + '" ',
      end: '/>'
    };

    this.setGraphHolder = function (graphHolder) {
      return document.querySelector(graphHolder);
    };

    this.setMinMax = function () {
      this.min = Math.min(...this.dataset);
      this.max = Math.max(...this.dataset);
    };

    this.calculateHeight = function (dataPoint) {
      return (dataPoint / this.max) * 100;
    };

    this.calculateYOffset = function (height) {
      return 100 - height;
    };

    this.createBar = function (dataPoint, index) {
      var height = this.calculateHeight(dataPoint);
      var xPos = index * 15 + 5;
      var bar = this.rectObj.open +
          this.rectObj.x + xPos +
          this.rectObj.y + this.calculateYOffset(height) +
          this.rectObj.width +
          this.rectObj.height + height +
          this.rectObj.style +
          this.rectObj.end;

      this.bars.push(bar);
    };

    this.createBars = function () {
      for (var i = 0; i < this.dataset.length; i++) {
        this.createBar(this.dataset[i], i);
      }
    };

    this.createGraph = function (graphData, graphContainer) {
      this.dataset = graphData;
      this.graphHolder = this.setGraphHolder(graphContainer);
      this.setMinMax();
      this.createBars();
      var svgWidth = this.bars.length * 15;
      var graphSvg = this.svgObj.open +
        svgWidth +
        this.svgObj.openSecond +
        svgWidth +
        this.svgObj.openThird +
        this.bars.join('') +
        this.svgObj.close;
      this.graphHolder.innerHTML = graphSvg;
    };
  };

  app.BarChart = BarChart;
})(window.app = window.app || {});
