(function (app) {
  var BarChart = function () {
    // TODO: add error checking

    this.chartSettings = {
      barColor: '#abc',
      chartHolder: '',
      chartTitle: 'Bar Chart',
      yAxisLabel: 'Y Axis',
      xAxisLabel: 'X Axis',
      xmlns: 'http://www.w3.org/2000/svg',
      plotAreaPaddingLR: 5,
      plotAreaPaddingTop: 15,
      chartYAxisWidth: 20,
      chartPaddingRight: 5,
      chartTitleHeight: 20,
      chartTitleFontSize: 12,
      chartLabelHeight: 20,
      chartLabelFontSize: 12,
      barWidth: 15,
      barSeperation: 10
    };

    this.chartData = {
      bars: [],
      dataset: [],
      min: 0,
      max: 100
    };

    this.setChartHolder = function (chartHolder) {
      return document.querySelector(chartHolder);
    };

    this.setMinMax = function () {
      this.chartData.min = Math.min(...this.chartData.dataset);
      this.chartData.max = Math.max(...this.chartData.dataset);
    };

    this.calculateHeight = function (dataPoint) {
      return (dataPoint / this.chartData.max) * 100;
    };

    this.calculateYOffset = function (height) {
      return 100 - height + this.chartSettings.plotAreaPaddingTop + this.chartSettings.chartTitleHeight;
    };

    // *********
    // Plot Area
    // *********
    this.createChartPlotArea = function () {
      var plotArea = document.createElementNS(this.chartSettings.xmlns, 'g');
      plotArea.setAttribute('id', 'plot-area');

      return plotArea;
    };

    this.createChartPlotAreaBorder = function (width) {
      var plotAreaBorder = document.createElementNS(this.chartSettings.xmlns, 'rect');
      var plotAreaHeight = 100 + this.chartSettings.plotAreaPaddingTop;
      plotAreaBorder.setAttribute('x', this.chartSettings.chartYAxisWidth);
      plotAreaBorder.setAttribute('y', this.chartSettings.chartTitleHeight);
      plotAreaBorder.setAttribute('height', plotAreaHeight);
      plotAreaBorder.setAttribute('width', width);
      plotAreaBorder.setAttribute('style', 'fill: none;');

      return plotAreaBorder;
    };

    // *********
    // Bars
    // *********
    this.createBar = function (dataPoint, index) {
      var height = this.calculateHeight(dataPoint);
      var cs = this.chartSettings;
      var xPos = index * (cs.barWidth + cs.barSeperation) + cs.plotAreaPaddingLR + cs.chartYAxisWidth;
      var bar = document.createElementNS(cs.xmlns, 'rect');
      bar.setAttribute('x', xPos);
      bar.setAttribute('y', this.calculateYOffset(height));
      bar.setAttribute('width', cs.barWidth);
      bar.setAttribute('height', height);
      bar.setAttribute('style', 'fill: ' + cs.barColor + ';');

      this.chartData.bars.push(bar);
    };

    this.createBars = function () {
      for (var i = 0; i < this.chartData.dataset.length; i++) {
        this.createBar(this.chartData.dataset[i], i);
      }
    };

    this.appendBarsToChart = function (plotAreaEl) {
      for (var i = 0; i < this.chartData.bars.length; i++) {
        plotAreaEl.appendChild(this.chartData.bars[i]);
      }
    };

    // *********
    // Chart Title/Axis Labels
    // *********
    this.createTitleArea = function () {
      var titleArea = document.createElementNS(this.chartSettings.xmlns, 'g');
      titleArea.setAttribute('id', 'title-area');

      return titleArea;
    };

    this.constructTitle = function () {
      var cs = this.chartSettings;
      var titlePadding = (cs.chartTitleHeight - cs.chartTitleFontSize) / 2;
      var titleArea = this.createTitleArea();
      var title = document.createElementNS(cs.xmlns, 'text');
      title.textContent = cs.chartTitle;
      title.setAttribute('font-family', 'sans-serif');
      title.setAttribute('font-size', cs.chartTitleFontSize);
      title.setAttribute('y', cs.chartTitleHeight - titlePadding);
      title.setAttribute('x', cs.chartYAxisWidth + cs.barWidth);

      titleArea.appendChild(title);

      return titleArea;
    };

    this.createYAxisLabelArea = function () {
      var label = document.createElementNS(this.chartSettings.xmlns, 'g');
      label.setAttribute('id', 'y-axis-label-area');

      return label;
    };

    this.constructYAxisLabel = function (chartHeight) {
      var cs = this.chartSettings;
      var labelPadding = (cs.chartLabelHeight - cs.chartLabelFontSize) / 2;
      var labelArea = this.createYAxisLabelArea();
      var label = document.createElementNS(cs.xmlns, 'text');
      var xPos = cs.chartLabelHeight - labelPadding;
      var yPos = chartHeight - cs.barWidth;
      label.textContent = cs.yAxisLabel;
      label.setAttribute('font-family', 'sans-serif');
      label.setAttribute('font-size', cs.chartLabelFontSize);
      label.setAttribute('y', yPos);
      label.setAttribute('x', xPos);
      label.setAttribute('transform', 'rotate(-90, ' + xPos + ', ' + yPos + ')');

      labelArea.appendChild(label);

      return labelArea;
    };

    // *********
    // Chart
    // *********
    this.constructSvgElement = function (width, height) {
      var svg = document.createElementNS(this.chartSettings.xmlns, 'svg');
      var viewBox = '0, 0, ' + width + ', ' + height;
      svg.setAttribute('x', '0');
      svg.setAttribute('y', '0');
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', viewBox);
      svg.setAttribute('style', 'border: 1px solid #aaa;');

      return svg;
    };

    this.createChart = function (chartData, chartContainer) {
      var cs = this.chartSettings;
      this.chartData.dataset = chartData;
      cs.chartHolder = this.setChartHolder(chartContainer);
      this.setMinMax();
      this.createBars();
      var plotWidth = this.chartData.bars.length * (cs.barWidth + cs.barSeperation) + cs.plotAreaPaddingLR;
      var chartHeight = 100 + this.chartSettings.plotAreaPaddingTop + this.chartSettings.chartTitleHeight;
      var chartWidth = plotWidth + cs.chartYAxisWidth + cs.chartPaddingRight;
      var chartSvg = this.constructSvgElement(chartWidth, chartHeight);
      var plotArea = this.createChartPlotArea();
      var plotAreaBorder = this.createChartPlotAreaBorder(plotWidth);
      var chartTitle = this.constructTitle();
      var yAxisLabel = this.constructYAxisLabel(chartHeight);

      chartSvg.appendChild(chartTitle);
      chartSvg.appendChild(yAxisLabel);
      chartSvg.appendChild(plotArea);
      plotArea.appendChild(plotAreaBorder);
      this.appendBarsToChart(plotArea);
      cs.chartHolder.innerHTML = '';
      cs.chartHolder.appendChild(chartSvg);
    };

    // *********
    // Chart Setters
    // *********
    this.setTitle = function (title) {
      this.chartSettings.title = title;
    };

    this.setXAxisLabel = function (label) {
      this.chartSettings.xAxisLabel = label;
    };

    this.setYAxisLabel = function (label) {
      this.chartSettings.yAxisLabel = label;
    };
  };

  app.BarChart = BarChart;
})(window.app = window.app || {});
